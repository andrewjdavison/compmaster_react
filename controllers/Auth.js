var Auth = rootRequire('models/auth');
var Compauth = rootRequire('models/compauth');
var responder = rootRequire('common/responder');
const jwt = require('jsonwebtoken');
var config = require('config');
var atob = require('atob');
var cmConst = rootRequire('common/const');
var capabilities = rootRequire('common/capabilities');
var moment = require('moment');


exports.postAuths = function(req,res) {
  var auth = new Auth();
  //make sure all the arguments are there...

  auth.username = ("username" in req.body) ? req.body.username:null;
  auth.id       = ("id" in req.body) ? req.body.id:null;
  auth.password = ("password" in req.body) ? req.body.password:null;

  // OK - We're only going to allow a superuser or the actual user to alter the auth table.
  // TODO: Implement authorization controls

  var user = null;

  if("authorization" in req.headers){
    var token = req.headers.authorization.split(' ')[1];
    var userPart = token.split('.')[1];
    user = JSON.parse(atob(token.split('.')[1]));
  }


  var searchAuth = new Auth();

  auth.hash();
  // first find the user that matches the specified username
  searchAuth.findOne({username: auth.username})
  .then((result)=> {
    if(auth.id) {
      if (auth.id !== user.id) {
        // Check to see whether this is a user who is authorized to modify auth records...
        if(user.permissions & cmConst.Permission.authMod){
        } else {
          throw new Error(responder.UNAUTHORIZED.code);
        }
      }
    } else {
      if(!result) {
        throw new Error(responder.USER_NOT_FOUND.code);
      }
      if(result.id !== user.id){
        // Check to see whether this is a user who is authorized to modify auth records...
        if(user.permissions & capabilities.admin){
        } else {
          throw new Error(responder.UNAUTHORIZED.code);
        }
      }
    }

    return auth.save();
  })
  .then((result)=>{
    var responseData={auths:result};
    responder.httpRespond(res, {code: responder.OK, detail:responseData});
  })
  .catch((err)=>{
    if(err.message == responder.USER_NOT_FOUND.code){
      responder.httpRespond(res, {code: responder.USER_NOT_FOUND});
    } else if (err.message == responder.UNAUTHORIZED.code){
      responder.httpRespond(res, {code: responder.UNAUTHORIZED});
    } else {
      responder.httpRespond(res, {code: responder.DB_ERR});
    }
  });
};

exports.getAuths = function(req, res) {
  var auth = new Auth();
  return auth.find()
  .then((result)=>{
    var responseData={auths:result};
    responder.httpRespond(res, {code: responder.OK, detail: responseData});
  });
};

exports.changePassword = function(req, res) {
  var token = req.body.password;
  var user = req.user;

  var auth = new Auth();
  auth.findOne({id: user.authid})
  .then((result)=>{
    auth.password = req.body.password;
    auth.hash();
    return auth.save();
  })
  .then((result)=>{
    responder.httpRespond(res, {code: responder.OK, detail: {}});
  })
  .catch((err)=>{
    console.log(err);
  });
};

exports.getAuth = function(req, res) {
  var auth = new Auth();
  return auth.findOne({id: req.params.id})
  .then((result)=> {
    var responseData={auths:[result]};
    responder.httpRespond(res, {code: responder.OK, detail: responseData});
  });
};

exports.serializeUser = function(req, res, next){
  var auth = new Auth();
  // get the user id into the user object
  var loadData=false;
  auth.findOne({id: req.user.id})
 .then((result)=> {
   if(result.activationCode!='' && result.activationCode!=null){
console.log("Login FAiled: Account is not activated yet!");
     auth.loginAttempts = auth.loginAttempts+1;
     auth.lastLoginAttempt = moment().format('YYYY-MM-DD H:mm:ss');
     var error = responder.USER_NOT_VALIDATED;
     responder.httpRespond(res, {code: error, detail: {unvalidated: true}});

   } else {
     req.user.userType = result.userType;
     req.user.permissions = result.permissions;
     auth.lastLogin = moment().format('YYYY-MM-DD H:mm:ss');
     auth.lastLoginAttempt = moment().format('YYYY-MM-DD H:mm:ss');
     auth.loginAttempts=0;
     loadData=true;
   }
   return auth.save();
 })
 .then((result)=>{
   console.log('Is this user activated?');
   if(loadData){
     let compauth = new Compauth();
     console.log('Going to try to load user permission data');
     return compauth.find({userId: req.user.userid});

   } else {
     return null;
   }
 })
 .then((result)=>{
   let compPerms = [];
   if(result){
    for(let i=0;i<result.length;i++){
      compPerms.push({compInstId: result[i].compInstId, level: result[i].level});
    }
    req.user.compPerms=compPerms;
   }
   return next();

 })
 .catch((err)=>{
   next();
 })

};

exports.serializeClient = function(req, res, next){
//  console.log('SerializeClient');
//  console.log(req.query.permanent);
  if(req.query.permanent === 'true'){
    next();
  } else {
    next();
  }
}
exports.generateToken = function(req, res, next){
  req.token = jwt.sign({
    id: req.user.id,
    userid: req.user.userid,
    authid: req.user.id,
    permissions: req.user.compPerms,
  },
  config.jwt.secret,
  {
    expiresIn: config.jwt.ttl
  });
  next();
};

exports.respond = function(req, res){
//  console.log('Responding');
  responder.httpRespond(res, {code: responder.OK, detail: {user: req.user, token:req.token}});
};



