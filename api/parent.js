const donor = require('./donor')
const user = require('./user')
const db = require('./db');

const con = db.con;

const addDonor = (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const body = req.body

    const fields = [
        body.first,
        body.last,
        2,
        body.gender,
        body.age,
        body.weight,
        body.height,
        body.foot,
        Math.round((Math.random() * 14999) + 1000)
    ]

    const sql =
        'INSERT INTO people (first, last, type, gender, age, weight, ' +
        'height, foot_size, cost) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    con.query(sql, fields, (err, result) => {
        if (err) throw err;

        const donorId = result.insertId;
        console.log('added donor at ' + donorId);

        //Add all of this parent's traits to the people_has_traits table
        const traits = [
            body.eye,
            body.hair,
            body.emotion,
            body.strength,
            ...body.disorders
        ]

        //First remove all pre-existing traits to avoid duplicates
        clearTraits(donorId, () => {
            //Adds each trait in traits recursively so that the
            //response is only sent after all queries have finished
            addTrait(traits, donorId, () => {
                console.log('All traits added to donor')
                res.json(true)
            })
        })
    })
}

//Updates this order's parent with the given body

const addParent = (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const body = req.body

    getParentId(body.orderId, body.gender, parentId => {
        const respond = () => { res.json(true) };

        donor.isDonor(parentId, found => {
            if (found) {
                user.addPerson({}, id => {

                    //Set the new default person to either the mom or the dad
                    //so that it can be replaced by the parent to be added
                    const field = body.gender === 1 ? 'mom_id' : 'dad_id'
                    const sql =
                        `UPDATE baby set ${field} = ? ` +
                        `WHERE ${field} = ?`
                    con.query(sql, [id, parentId], err => {
                        if (err) throw err;
                        console.log(`The ${field} is now ${id}`)
                        replaceParent(id, body, respond)
                    })
                })
            } else {
                replaceParent(parentId, body, respond)
            }
        })
    })
}

exports.add = addParent;

const replaceParent = (parentId, body, cb) => {
    console.log(`Replacing ${parentId}`)
    const fields = [
        body.first,
        body.last,
        body.type ? body.type : 1,
        body.age,
        body.weight,
        body.height,
        body.foot,
        parentId
    ]
    updateParent(parentId, fields, () => {
        //Add all of this parent's traits to the people_has_traits table
        const traits = [
            body.eye,
            body.hair,
            body.emotion,
            body.strength,
            ...body.disorders
        ]

        //First remove all pre-existing traits to avoid duplicates
        clearTraits(parentId, () => {
            //Adds each trait in traits recursively so that the
            //response is only sent after all queries have finished
            addTrait(traits, parentId, () => {
                console.log('All traits added')
                cb();
            })
        })
    })
}

exports.get = (req, res) => {
    const orderId = req.query.orderId;

    if (!orderId) {
        res.json({
            error: 'Missing required parameter: \'orderId\''
        });
        return;
    }

    //Get the ids of the mom and dad associated with this order
    getParentId(orderId, 1, mom_id => {
        getParentId(orderId, 2, dad_id => {

            const sql =
                'SELECT people_id ' +
                'FROM people ' +
                'WHERE people_id = ? OR people_id = ?'
            con.query(sql, [mom_id, dad_id], (err, result) => {
                if (err) throw err;

                const parentIds = result.map(row => (row['people_id']))

                donor.getDonorInfo(parentIds, [], parents => {
                    console.log('Both parents retrieved');
                    res.json(parents)
                })
            })

        })
    })
}

//Deletes all the traits for the parent with the given id
//from the people_has_trait table
const clearTraits = (parentId, cb) => {
    const sql =
        'DELETE FROM people_has_trait ' +
        'WHERE people_id = ?'
    con.query(sql, [parentId], (err) => {
        if (err) throw err;

        console.log(`Cleared traits from parent ${parentId}`)
        cb();
    })
}

/* TODO
    - combine the two queries in addTrait into one query
*/

//Gets the id of the given trait with the given type
//and adds it to the people_has_trait table for this parent
const addTrait = (traits, parentId, cb) => {
    if (traits.length === 0) {
        cb()
    } else {

        typeId = Math.min(traits.length, 5)
        const trait = traits.splice(-1);

        const sql =
            'SELECT trait_id ' +
            'FROM trait ' +
            'WHERE type_id = ? AND name = ?'
        con.query(sql, [typeId, trait], (err, result) => {
            if (err) throw err;

            const traitId = result[0].trait_id
            console.log(`Adding trait ${traitId} to Parent ${parentId}`)

            const sqlAddTrait =
                'INSERT INTO people_has_trait (people_id, trait_id) ' +
                'VALUES (?, ?)'
            con.query(sqlAddTrait, [parentId, traitId], (err) => {
                if (err) throw err;

                addTrait(traits, parentId, cb)
            })
        })
    }
}

//Update all the given fields for this parent
const updateParent = (parentId, fields, cb) => {
    const sql =
        'UPDATE people ' +
        'SET first = ?, last = ?, type = ?, ' +
        'age = ?, weight = ?, height = ?, foot_size = ? ' +
        'WHERE people_id = ?'
    con.query(sql, fields, err => {
        if (err) throw err;
        console.log('Updated parent at ' + parentId)
        cb();
    })
}

//Gets the id of the mom or dad associated with this order
//It is impossible to create an order without parents associated
//so this should always be successful
const getParentId = (orderId, gender, cb) => {
    console.log('Retrieving parents for order ' + orderId)

    const sql =
        'SELECT order_id, mom_id, dad_id ' +
        'FROM orders JOIN baby USING(baby_id) ' +
        'WHERE order_id = ?'
    con.query(sql, [orderId], (err, result) => {
        if (err) throw err;

        if (result.length !== 0) {
            const baby = result[0]
            cb(gender === 1 ? baby.mom_id : baby.dad_id)
        } else {
            console.log('This order has no parents')
        }
    })
}

exports.getParentId = getParentId;