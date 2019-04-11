// const express = require("express");
// const fs = require("fs");
// const sqlite = require("sql.js");

// const filebuffer = fs.readFileSync("db/usda-nnd.sqlite3");

// const db = new sqlite.Database(filebuffer);

// const app = express();

// app.set("port", process.env.PORT || 3001);

// // Express only serves static assets in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

// const COLUMNS = [
//   "carbohydrate_g",
//   "protein_g",
//   "fa_sat_g",
//   "fa_mono_g",
//   "fa_poly_g",
//   "kcal",
//   "description"
// ];
// app.get("/api/food", (req, res) => {
//   const param = req.query.q;

//   if (!param) {
//     res.json({
//       error: "Missing required parameter `q`"
//     });
//     return;
//   }

//   // WARNING: Not for production use! The following statement
//   // is not protected against SQL injections.
//   const r = db.exec(
//     `
//     select ${COLUMNS.join(", ")} from entries
//     where description like '%${param}%'
//     limit 100
//   `
//   );

//   if (r[0]) {
//     res.json(
//       r[0].values.map(entry => {
//         const e = {};
//         COLUMNS.forEach((c, idx) => {
//           // combine fat columns
//           if (c.match(/^fa_/)) {
//             e.fat_g = e.fat_g || 0.0;
//             e.fat_g = (parseFloat(e.fat_g, 10) +
//               parseFloat(entry[idx], 10)).toFixed(2);
//           } else {
//             e[c] = entry[idx];
//           }
//         });
//         return e;
//       })
//     );
//   } else {
//     res.json([]);
//   }
// });

// app.listen(app.get("port"), () => {
//   console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
// });

const express = require('express');
const mysql = require('mysql');

const port = 3001;

const app = express();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "stupidismankindall"
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");

  let sql = 'USE designerbaby';

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log('using designerbaby ' + result);
  });
});

app.get('/api/users/has-user', (req, res) => {
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

app.listen(port, () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});