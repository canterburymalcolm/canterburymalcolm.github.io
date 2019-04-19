const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const util = require('util');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3001);

if (process.env.NODE_ENV === 'production') {
  console.log('In production, serving static assets');
  app.use(express.static(path.join(_dirname, 'client/build')));
}

const jsonParser = bodyParser.json();

const con = mysql.createConnection({
  host: "designerbabydb.csbfdivf1iuj.us-east-2.rds.amazonaws.com",
  user: "master",
  password: "babysrus123"
});

con.connect((err) => {
  if (err) {
    console.log("connection failed: " + util.inspect(err, { showHidden: true, depth: 2 }));
    throw err;
  }
  console.log("Connected!");

  let sql = 'USE designerbaby';

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log('using designerbaby ' + result);
  });
});

app.get('/api/user', (req, res) => {
  const username = req.query.name;
  const password = req.query.pass;

  //error if query is formed incorrectly
  if (!username) {
    res.json({
      error: 'Missing required parameter: \'name\''
    });
    return;
  }

  console.log('searching for ' + username);

  //Check if username is available
  const sql = 'SELECT user_id, username, password FROM user WHERE username = ?';
  con.query(sql, [username], (err, result) => {
    if (err) throw err;

    if (password) {
      let index = -1;
      result.forEach((user) => {
        if (user.password === password) {
          index = user.user_id;
          console.log('password is correct');
        }
      });
      res.json(index);
    } else {
      res.json((result.length != 0));
    }
  });
});

app.post('/api/user', jsonParser, (req, res) => {
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
  const sql = 'INSERT INTO user (username, password, email, street, city, state, zip) ' +
              'VALUES (?, ?, ?, ?, ?, ?, ?)';
  con.query(sql, fields, (err, result) => {
    if (err) throw err;

    console.log('added ' + user.username + ' at ' + result.insertId);
    res.json(result.insertId);
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});