'use strict';

const passport = require('passport');
const Strategy = require('passport-local');
var Auth = require('../models/auth');
var moment = require('moment');

passport.use(new Strategy(
  function(username, password, done) {
    var auth = new Auth();
    var authenticated=false;

    const userData = {
      username: username.trim(),
      password: password.trim()
    };

    console.log('Authenticating...');
    console.log('Username: ' + userData.username);
    console.log('Password: ' + userData.password);

    auth.findOne({email:userData.username})
    .then((result)=>{
      console.log(result);
      if((!result)||(result==null)) {
       throw new Error('Couldn\'t locate user');
      }
      console.log('Last Login: '+ auth.lastLogin);
      auth.lastLogin = moment(auth.lastLogin, moment.ISO_8601).format('YYYY-MM-DD H:mm:ss');
      console.log('Last Login: '+ auth.lastLogin);
      auth.lastLoginAttempt = moment().format('YYYY-MM-DD H:mm:ss');;
      return auth.save();
    })
    .then((res)=> {
      console.log('Verifying Password');
      return auth.verifyPassword(userData.password);
    })
    .then((res)=> {
      if(!res){
        throw new Error('Couldn\'t verify password');
      }
      console.log('Verified Password');
      auth.lastLogin = moment(auth.lastLogin, "YYYY-MM-DD H:mm:ss").format('YYYY-MM-DD H:mm:ss');
      auth.lastLoginAttempt = moment().format('YYYY-MM-DD H:mm:ss');
      auth.loginAttempts=0;
      return auth.save();
    })
    .then((res)=>{
      var returnObj = {
        id: auth.id,
        userid: auth.userid,
        username: auth.username
      };
      done(null, returnObj);
    })
    .catch((err)=>{
      console.log(err.name + ' (' + err.message + ')');
//      auth.lastLogin = moment(auth.lastLogin).format('YYYY-MM-DD H:mm:ss');
      auth.lastLoginAttempt = moment().format('YYYY-MM-DD H:mm:ss');
      auth.loginAttempts = auth.loginAttempts+1;

      if(auth.id!=null){
        auth.save()
      }
      done(null, false, { message: 'Login attempt failed' });
    });
  }
));

module.exports = passport;



