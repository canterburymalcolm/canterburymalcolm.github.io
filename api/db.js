const mysql = require('mysql');
const util = require('util');

//Create a connection to our database hosted with Amazon RDS
const con = mysql.createConnection({
  host: "designerbabydb.csbfdivf1iuj.us-east-2.rds.amazonaws.com",
  user: "master",
  password: "babysrus123"
});

//Connect to and select our database
con.connect((err) => {
  if (err) {
    console.log("connection failed: " + util.inspect(err, { showHidden: true, depth: 2 }));
    throw err;
  }

  let sql = 'USE designerbaby';
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Connected to database: designerbaby');
  });
});

exports.con = con;