const db = require('./db');

const con = db.con;

//Updates this order's parent with the given body
exports.add = (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const body = req.body;

    getParents(body.orderId, parents => {
        console.log(parents);
        console.log('Gender: ' + body.gender);
        const parentId = body.gender === 1 ? parents[0] : parents[1];
        const fields = [
            body.first,
            body.last,
            body.type ? body.type : 1,
            body.age,
            parentId
        ];

        const sql = 
            'UPDATE people ' +
            'SET first = ?, last = ?, type = ?, age = ? ' +
            'WHERE people_id = ?';
        con.query(sql, fields, (err, result) => {
            if (err) throw err;

            console.log('Updated parent at ' + parentId);
        });
    });
};

//Gets the ids of the mom and dad associated with this order
//It is impossible to create an order without parents associated
//so this should always be successful
const getParents = (orderId, cb) => {
    console.log('Retrieving parents for order ' + orderId);
    const sql =
        'SELECT order_id, mom_id, dad_id ' +
        'FROM orders JOIN baby USING(baby_id) ' +
        'WHERE order_id = ?';
    con.query(sql, [orderId], (err, result) => {
        if (err) throw err;

        if (result.length !== 0) {
            const baby = result[0];
            cb([baby.mom_id, baby.dad_id]);
        } else {
            console.log('This order has no parents');
        }
    });
}