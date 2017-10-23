// start with node authentication/refreshTokenScenario.js
'use strict';

///////////////////
// configuration //
///////////////////
const PORT = 1337; // i know, its old...
const SECRET = 'server secret';
const TOKENTIME = 120 * 60; // in seconds

/////////////
// modules //
/////////////
const bodyParser = require('body-parser');
const express = require('express');
const expressJwt = require('express-jwt');
const http = require('http');
const jwt = require('jsonwebtoken');
const logger = require('morgan');
const passport = require('passport');
const Strategy = require('passport-local');

const app = express();
const authenticate = expressJwt({
    secret: SECRET
});

////////////////////
// database dummy //
////////////////////
const db = {
  updateOrCreate: function(user, cb) {
    console.log('In updateOrCreate');
    // db dummy, we just cb the user
    cb(null, user);
  },
  authenticate: function(username, password, cb) {
    console.log('In Authenticate');
    // database dummy - find user and verify password
    if (username === 'devils name' && password === '666') {
      cb(null, {
        id: 666,
        firstname: 'devils',
        lastname: 'name',
        email: 'devil@he.ll',
        verified: true
      });
    } else {
      cb(null, false);
    }
  }
};
//////////////
// passport //
//////////////
passport.use(new Strategy(
  function(username, password, done) {
    console.log('In passport stretegy');
    db.authenticate(username, password, done);
  }
));

////////////
// server //
////////////
app.use(logger('dev'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.status(200).json({
    hello: 'world'
  });
});

app.post('/auth', passport.initialize(), passport.authenticate(
  'local', {
    session: false,
    scope: []
  }), serialize, generateToken, respond);

app.get('/me', authenticate, function(req, res) {
  res.status(200).json(req.user);
});
http.createServer(app).listen(PORT, function() {
  console.log('http server listening on port ', PORT);
});

////////////
// helper //
////////////
function serialize(req, res, next) {
  db.updateOrCreate(req.user, function(err, user) {
    if (err) {
      return next(err);
    }
    // we store information needed in token in req.user again
    req.user = {
      id: user.id
    };
    next();
  });
}

function generateToken(req, res, next) {
  req.token = jwt.sign({
    id: req.user.id,
  }, SECRET, {
    expiresIn: TOKENTIME
  });
  next();
}

function respond(req, res) {
  res.status(200).json({
    user: req.user,
    token: req.token
  });
}
