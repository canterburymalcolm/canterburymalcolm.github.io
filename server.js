const express = require('express');
const bodyParser = require('body-parser');
const user = require('./api/user');
const parent = require('./api/parent');

const app = express();

//Set our port to 3001 for testing locally
app.set('port', process.env.PORT || 3001);

//In production use serve-static middleware to serve all
//of our React assests statically
if (process.env.NODE_ENV === 'production') {
  console.log('Production build, serving static assets from client/build');
  app.use(express.static('client/build'));
}

const jsonParser = bodyParser.json();

//Determines if the given user exists in the database
//and if a password is given checks to see that it matches
app.get('/api/user', user.get);

//Adds the given user to the user table
app.post('/api/user', jsonParser, user.add);

//Add the given parent to this user's order
app.post('/api/parent', jsonParser, parent.add);

app.listen(app.get('port'), () => {
  console.log(`Using port ${app.get("port")}/`); // eslint-disable-line no-console
});