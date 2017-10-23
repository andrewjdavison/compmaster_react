'use strict';
var config = require('config');
var TableController = rootRequire('controllers/table');
var Reset = rootRequire('models/reset');
var Auth = rootRequire('models/auth');
var User = rootRequire('models/user');
var responder = rootRequire('common/responder');
var nodemailer=require('nodemailer');
var transporter = nodemailer.createTransport(config.mail.transport);
var KeyGenerator = require('uid-generator');
var keygen = new KeyGenerator(256, KeyGenerator.BASE62);
var bcrypt = require('bcryptjs');

var Promise = this.Promise || require('promise');
var agent = require('superagent-promise')(require('superagent'),Promise);


var request = require('superagent');
var generatePassword = require('password-generator');

var mailpart1 = ' <!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <meta name="generator" content="CoffeeCup HTML Editor (www.coffeecup.com)">'+
                '<meta name="dcterms.created" content="Sat, 14 May 2016 10:06:35 GMT"> <meta name="description" content="">'+
                '<meta name="keywords" content=""> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <title>cm-password-email</title>'+
                '<style type="text/css"> <!-- body { color:#000000; background-color:#FFFFFF; background-image:url("Background Image"); background-repeat:no-repeat;'+
                '} a  { color:#0000FF; } a:visited { color:#800080; } a:hover { color:#008000; } a:active { color:#FF0000; } -->'+
                '</style> <!--[if IE]> <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script> <![endif]--> </head>'+
                '<body> <table border="0"  cellpadding="0" cellspacing="0" width="100%"> <tr> <td>'+
                '<table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">'+
                '<tr> <td bgcolor="#70bbd9" align="center" style="padding: 0px 0 0px 0;"> <img src="http://i.imgur.com/nN7456M.png" alt="Your New CompMaster Password" width="600">'+
                '</td> </tr> <tr> <td bgcolor="#ffffff" style="padding:40px 30px 40px 30px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr>'+
                '<td style="color: #153643; font-family: Arial, san-serif; font-size: 16px;line-height: 24px;"> <b>Your new CompMaster Account has been setup for you</b> </td> </tr>'+
                '<tr> <td style="padding: 20px 0 0px 0;color: #153643; font-family: Arial, sans-serif; font-size: 13px; line-height: 16px;padding-bottom:20px;" >'+
                'Thanks for signing up with CompMaster. Our goal is to take the pain out of entering and running competitions of all kinds. '+
                '<br><br>Your CompMaster username is: <span style="font-family: Arial, san-serif; font-size:16px; color: #FF4B9F">';

var mailpart2 = '</span>  </td> </tr> <tr> <td  > <div style=" background-color: green;height: 40px;border-radius: 10px 10px 10px 10px; text-align: center; vertical-align: middle; width: 70%; margin-left: 15%; font-family: Arial, san-serif;  font-size: 16px; color: white; padding-top: 20px;" >'+
                '<a style="color: #FFFFFF" href="'+config.cmsURL+'/activate/';

var mailpart3 = '">Click on this link to activate your account</a> </div> </td> </tr><tr><small><p style="text-align:center">(If you did not create this account, please ignore this mail)</p></small> <tr>'+
                '<td style="padding: 20px 0 0px 0;color: #153643; font-family: Arial, sans-serif; font-size: 13px; line-height: 16px;" >'+
                'Some of the things you will be able to do are:   </td> </tr> <tr>'+
                '<table width="100%" style="margin-top:10px"> <tr> <td width="45%" height="30px" bgcolor="#F050005">'+
                '<p style="font-family: Arial, san-serif; font-size: 16px; line-height: 18px; color: #ffffff; text-align: center;">'+
                '<strong>For Entrants</strong> </p>  </td> <td width="45%" height="30px" bgcolor="#2783783">'+
                '<p style="font-family: Arial, san-serif; font-size: 16px; line-height: 16px; color: #ffffff; text-align: center;">'+
                '<strong>For Organisers</strong> </p> </td> </tr> <tr> <td width="50%"> <p style="font-family: Arial, san-serif; font-size: 16px; line-height: 16px;">'+
                '<ul style="font-family: Arial, san-serif; font-size: 12px; line-height: 16px;">'+
                '<li>Enter and pay for registered competitions online</li>'+
                '<li>Get updates from competition organisers</li>'+
                '<li>Review and edit your entries online up to the closing date</li>'+
                '<li>Get competition results as soon as they are made available by organisers</li>'+
                '<li>View and download entry feedback for all the competitions you have entered in the past</li>'+
                '<li>Get information about competitions coming up in your area</li>'+
                '</ul> </p> </td> <td> <p style="font-family: Arial, san-serif; font-size: 16px; line-height: 16px;">'+
                '<ul style="font-family: Arial, san-serif; font-size: 12px; line-height: 16px;">'+
                '<li>Get competition entry statistics well ahead of your competition day</li>'+
                '<li>Communicate with your entrants, judges and staff</li>'+
                '<li>Simplify your data entry with our error checking spreasheet, or enter your results directly online</li>'+
                '<li>Collect competition fees online, and allow for discounts and gift entries</li>'+
                '<li>Reduce the time you need to get your competition organised</li>'+
                '</ul> </p> </td> </tr> </table> </tr> <tr>'+
                '<td style="text-align:center; padding: 20px 0 30px 0;; font-family: Arial, sans-serif; font-size: 14px; line-height: 16px;">'+
                'Your activation link is <br><span style="font-size:14px;"><strong>'+config.cmsURL+'/activate/';

var mailpart4 = '</strong></span><br>Cut and paste this into your browser if you cannot click on the above link or if you are worried this might be a spam attack!'+
                '</td> </tr>            </table> </td> </tr> <tr> <td bgcolor = "#ee4c50"> &nbsp; </td> </tr> </table>  </td><!-- Col 1 --> </tr> </table> </body> </html>';

class SignupController {
  constructor(){
    var reset = new Reset();
  }

  reactivate(req,res){
    var username = ('username' in req.params)?req.params.username:null;
    var auth = new Auth();
    var user = new User();

    return auth.findOne({username:username})
    .then((result)=>{
      return user.findOne({id: auth.userid});
    })
    .then((result)=>{
      // Generate a new authentication token
      auth.activationCode = keygen.generateKey();;
      return auth.save();
    })
    .then((result)=>{


      //console.log(user);
      console.log(auth);
      var mailOptions = {
        from: '"CompMaster Admin" <support@compmaster.com.au>',
        to:   user.email,
        subject: 'Your new CompMaster Account',
        html: mailpart1+auth.username+mailpart2+auth.activationCode+mailpart3+auth.activationCode+mailpart4
      };
      return transporter.sendMail(mailOptions)
    })
    .then((result)=>{
          responder.httpRedirect(res, {path: config.client.url+'/reactivated' , detail:{msg:"User has been Activated"}});
    })
    .catch((err)=>{
      if(err===1){
        responder.httpRespond(res, {code: responder.OK, detail:{errors:errors}});
      } else {
        console.log(err);
      }
    })
  }

  activate(req, res){
    var activationCode = ('id' in req.params)?req.params.id:null;
    console.log('Looking for auth token: ' + activationCode);

    if(activationCode){
      // See if we can find it in the auth table...
      var auth = new Auth();
      return auth.findOne({activationCode: activationCode})
      .then((result)=> {
        if(!result){
          throw 1;
        }
        auth.activationCode='';
        return auth.save();
      })
      .then((result)=>{
          responder.httpRedirect(res, {path: config.client.url+'/login' , detail:{msg:"User has been Activated"}});

      })
      .catch((err)=>{
        responder.httpRespond(res, {code: responder.INVALID_VALIDATION_TOKEN});
      });

    } else {
      responder.httpRespond(res, {code: responder.NO_VALIDATION_TOKEN, detail:{error:"Activation code not provided"}});
    }


  }

  post(req,res){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var recaptcha = req.body.recaptcha;
    var activationCode = keygen.generateKey();


    var auth = new Auth();
    var user = new User();
    var errors=[];


    var requestData = {
        secret: config.recaptcha.secret,
        response: req.body.recaptcha
    };

    if(!("email" in req.body)){
        console.log('No Email in signup request');
        responder.httpRespond(res, {code: responder.USER_NOT_CREATED, detail:{error:"email was not provided"}});
        return;
    };
    if(!("username" in req.body)){
        console.log('No Username in signup request');
        responder.httpRespond(res, {code: responder.USER_NOT_CREATED, detail:{error:"username was not provided"}});
        return;
    };
    if(!("recaptcha" in req.body)){
        console.log('No recaptcha in signup request');
        responder.httpRespond(res, {code: responder.USER_NOT_CREATED, detail:{error:"recaptcha was not provided"}});
        return;
    };
    if(!("password" in req.body)){
        console.log('No password in signup request');
        responder.httpRespond(res, {code: responder.USER_NOT_CREATED, detail:{error:"password was not provided"}});
        return;
    };
    //console.log('Checking recaptcha');
    //console.log('Secret: '+config.recaptcha.secret);
    //console.log('Site Key: ' + req.body.recaptcha);
    return agent('GET', 'https://www.google.com/recaptcha/api/siteverify?secret='+
                       config.recaptcha.secret+'&response='+req.body.recaptcha)
    .end()
    .then((result)=>{
      if (!result.body.success ) {
        var err=responder.RECAPTCHA_ERROR;
        console.log('error in recaptcha response');
        errors.push({code: err.code, msg: 'Error in recaptcha response'});
      }
      return user.findOne({email: email})
    })
    .then((result)=>{
      if(result){
        var err=responder.DB_DUP_EMAIL;
        console.log('Duplicate email');
        errors.push({code: err.code, msg: 'Email is already registered'});
      }
      return auth.findOne({username:username});
    })
    .then((result)=>{
      if(result){
        var err=responder.USERNAME_TAKEN;
        errors.push({code: err.code, msg: 'Username is already registered'});
      }
      // The user is now ok to be created...
      if(errors.length>0){
        throw 1;
      }
      var newUser = new User();
      newUser.email = email;
      return newUser.save();
    })
    .then((result)=>{
      var newAuth = new Auth();
      newAuth.username = username;
      newAuth.password = password;
      newAuth.userid = result.id;
      newAuth.activationCode = activationCode;
      newAuth.hash();
      return newAuth.save();
    })
    .then(()=>{
      responder.httpRespond(res, {code: responder.OK, detail:{}});
    })
    .then(()=>{
      var mailOptions = {
        from: '"CompMaster Admin" <support@compmaster.com.au>',
        to:   email,
        subject: 'Your new CompMaster Account',
        html: mailpart1+username+mailpart2+activationCode+mailpart3+activationCode+mailpart4
      };
      return transporter.sendMail(mailOptions);
    })

    .catch((err)=>{
      if(err===1){
        responder.httpRespond(res, {code: responder.OK, detail:{errors:errors}});

      } else {
        console.log(err);
      }
    })


  }
}



module.exports = SignupController;
