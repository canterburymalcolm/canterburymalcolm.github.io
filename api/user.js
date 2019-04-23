const db = require('./db');

const con = db.con;

//Get all users with the given username,
//Should always be an array of size one or zero because this
//api endpoint cannot be called with a username that already exists
exports.get = (req, res) => {
    const username = req.query.name;
    const password = req.query.pass;

    //Throw error if query is formed incorrectly,
    //the client prevents invalid queries from being formed
    if (!username) {
        res.json({
            error: 'Missing required parameter: \'name\''
        });
        return;
    }

    console.log(`Searching User for ${username}`);

    const sql = 'SELECT user_id, username, password FROM user WHERE username = ?';
    con.query(sql, [username], (err, result) => {
        if (err) throw err;

        if (password) {
            //Get the index of the user with a matching password
            //if none exists return -1
            userId = -1;
            result.forEach((user) => {
                if (user.password === password) {
                    userId = user.user_id;
                    console.log('Password is valid');
                }
            });

            if (userId !== -1) {
                getOrder(userId, orderId => {
                    res.json([userId, orderId]);
                });
            } else {
                res.json(userId);
            }
        } else {
            //If no password given return whether any users were found
            res.json(result.length !== 0);
        }
    });
};

//Adds this user to the databse and creates a coresponding order
exports.add = (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const user = req.body;
    const fields = [
        user.username,
        user.password,
        user.email,
        user.street,
        user.city,
        user.state,
        user.zip
    ];
    const sql =
        'INSERT INTO user (username, password, email, street, city, state, zip) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?)';
    con.query(sql, fields, (err, result) => {
        if (err) throw err;

        const userId = result.insertId;
        console.log(`Added ${user.username} to User at ${userId}`);

        //Create a new order in Orders for this user
        addOrder(userId, orderId => {
            res.json([userId, orderId]);
        });
    });
};

//If the given userId already has an ongoing order then
//use that otherwise make a new order for this user
const getOrder = (userId, cb) => {
    const sql =
        `SELECT order_id, user_id FROM orders WHERE user_id = ?`;
    con.query(sql, [userId], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            console.log('Found order at ' + result[0].order_id);
            cb(result[0].order_id);
        } else {
            addOrder(userId, cb);
        }
    });
}

//Adds a default order to Orders with the given userId
//returns the generated order_id
const addOrder = (userId, cb) => {
    addBaby(babyId => {
        const sql =
            'INSERT INTO orders (user_id, baby_id) ' +
            'VALUES (?, ?)';
        con.query(sql, [userId, babyId], (err, result) => {
            if (err) throw err;

            console.log('Added order at ' + result.insertId);
            cb(result.insertId);
        });
    });
}

//Adds a default baby to Baby, returns its id
const addBaby = cb => {
    const fields = []
    addPerson({ type: 3 }, babyId => {
        fields[0] = babyId
        addPerson({}, momId => {
            fields[1] = momId
            addPerson({ gender: 2 }, dadId => {
                fields[2] = dadId

                const sql =
                    'INSERT INTO baby (baby_id, mom_id, dad_id) ' +
                    'VALUES (?, ?, ?)'
                con.query(sql, fields, err => {
                    if (err) throw err;

                    console.log('added baby at ' + fields[0])
                    cb(fields[0])
                })
            })
        })
    })
}

//Add a default person to People and return its id
const addPerson = (person, cb) => {
    const fields = [
        'first',
        'last',
        person.type ? person.type : 1,
        person.gender ? person.gender : 1,
        0,
        0
    ];

    const sql =
        'INSERT INTO people (first, last, type, gender, height, foot_size) ' +
        'VALUES (?, ?, ?, ?, ?, ?)';
    con.query(sql, fields, (err, result) => {
        if (err) throw err;

        console.log('added person at ' + result.insertId);
        cb(result.insertId);
    });
};

exports.addPerson = addPerson;