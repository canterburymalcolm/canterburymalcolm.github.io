const parent = require('./parent')
const db = require('./db');

const con = db.con;

exports.get = (req, res) => {
    const gender = req.query.gender;

    if (!gender) {
        res.json({
            error: 'Missing required parameter: \'gender\''
        });
        return;
    }
    const sql =
        'SELECT people_id ' +
        'FROM people ' +
        'WHERE type = 2 AND gender = ?'
    con.query(sql, [parseInt(gender)], (err, result) => {
        if (err) throw err;

        const donorIds = result.map(row => (row['people_id']))

        getDonorInfo(donorIds, [], donors => {
            console.log('All Donors retrieved');
            res.json(donors)
        })
    })
}

exports.add = (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const orderId = req.body.orderId
    const gender = req.body.gender
    const donorId = req.body.donorId;

    console.log(`Recieved ${orderId}, ${donorId}, ${gender}`)

    //Get the id of the parent that we are replacing and delete all
    //of their entries in the people_has_trait table so we can safely remove them
    parent.getParentId(orderId, gender, parentId => {
        console.log(`Replacing parent: ${parentId} with donor: ${donorId}`)

        const field = gender === 1 ? 'mom_id' : 'dad_id'
        //Set the id of the old parent to the id of the new donor
        const sqlSet =
            `UPDATE baby set ${field} = ? ` +
            `WHERE ${field} = ?`
        con.query(sqlSet, [donorId, parentId], err => {
            if (err) throw err;

            isDonor(parentId, found => {
                if (found) {
                    console.log('The previous parent was a donor')
                    res.json(true)
                } else {
                    deleteParent(parentId, () => {
                        console.log('Successfully added donor');
                        res.json(true)
                    })
                }
            })
        })
    })
}

//Delete the parent at the given idea from the
//people table as well as the people_has_trait table
const deleteParent = (parentId, cb) => {
    const sqlDelete =
        'DELETE FROM people_has_trait ' +
        'WHERE people_id = ?'
    con.query(sqlDelete, [parentId], err => {
        if (err) throw err;

        const sqlDelParent =
            'DELETE FROM people ' +
            'WHERE people_id = ?'
        con.query(sqlDelParent, [parentId], err => {
            if (err) throw err;

            cb()
        })
    })
}

//Determines if the parent with the given id is a donor
const isDonor = (id, cb) => {
    const sql =
        'SELECT people_id ' +
        'FROM people ' +
        'WHERE people_id = ? && type = 2'
    con.query(sql, [id], (err, result) => {
        if (err) err;

        cb(result.length > 0)
    })
}

exports.isDonor = isDonor;

//Retrieve all of the relevent fields and traits for
//the donor at the given index
const getDonorInfo = (donorIds, donors, cb) => {

    if (donorIds.length == 0) {
        cb(donors)
        return;
    }

    const id = donorIds.splice(-1)

    const sql =
        'SELECT concat(first, \' \', last) name, age, cost, ' +
        'height, weight, foot_size \'foot size\' ' +
        'FROM people WHERE people_id = ?'
    con.query(sql, [id], (err, result) => {
        if (err) throw err;

        let donor = {
            id: id,
            fields: result[0]
        }

        const sql =
            'SELECT trait_type.name type, trait.name trait ' +
            'FROM people_has_trait ' +
            '   JOIN trait USING(trait_id) ' +
            '       JOIN trait_type USING(type_id) ' +
            'WHERE people_id = ? && type_id != 5'
        con.query(sql, [id], (err, result) => {
            if (err) throw err;

            let traits = {}
            result.forEach((row) => {

                traits = {
                    ...traits,
                    [row.type]: row.trait
                }
            })

            getDonorInfo(
                donorIds,
                [...donors, { ...donor, traits: traits }],
                cb
            )
        })
    })
}

exports.getDonorInfo = getDonorInfo;