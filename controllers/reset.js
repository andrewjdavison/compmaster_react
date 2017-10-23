'use strict';
var config = require('config');
var TableController = rootRequire('controllers/table');
var Reset = rootRequire('models/reset');
var Auth = rootRequire('models/auth');
var User = rootRequire('models/user');
var responder = rootRequire('common/responder');
var request = require('superagent');
var nodemailer=require('nodemailer');
var transporter = nodemailer.createTransport(config.mail.transport);
var bcrypt = require('bcryptjs');

var generatePassword = require('password-generator');

var mailpart1 = ' <tr> <td> <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">'+
                '<tr> <td bgcolor="#70bbd9" align="center" style="padding: 0px 0 0px 0;">'+
                '<img src="http://i.imgur.com/4KiJH27.png" alt="Your New CompMaster Password" width="600">'+
                '</td> </tr> <tr> <td bgcolor="#ffffff" style="padding:40px 30px 40px 30px;">'+
                ' <table border="0" cellpadding="0" cellspacing="0" width="100%">'+
                '<tr>'+
                '<td style="color: #153643; font-family: Arial, san-serif; font-size: 16px;line-height: 24px;">'+
                "<b>Here's your new CompMaster password</b>"+
                '</td>'+
                '</tr>'+
                '<tr>'+
                '<td style="padding: 20px 0 0px 0;color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 16px;" >'+
                'Your password has been reset, and your new password for username ';

var mailpart1b =' is '+
                '</td>'+
                '</tr>'+
                '<tr>'+
                '<td style="text-align: center; padding: 20px 0 30px 0;color: #FF4B9F; font-family: Arial, sans-serif; font-size: 20px; line-height: 16px;" >';



var mailpart2 = '</td> </tr> <tr> <td style="padding: 20px 0 30px 0;color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 16px;">'+
                'You should log into your CompMaster account now and change your password to something your going to remember.   '+
                '</td>'+
                '</tr>'+
                '<tr>'+
                '<td style="text-align:center; padding: 20px 0 30px 0;color: #0000FF; font-family: Arial, sans-serif; font-size: 16px; line-height: 16px;">'+
                '<a href="http://www.compmaster.com.au">http://www.compmaster.com.au</a>'+
                '</td>'+
                '</tr>            '+
                '</table>'+
                '</td>'+
                '</tr>'+
                '<tr>'+
                '<td bgcolor = "#ee4c50">'+
                '&nbsp;'+
                '</td>'+
                '</tr>'+
                '</table>  '+
                '</td><!-- Col 1 -->'+
                '</tr>'+
                '</table>'+
                '</body>'+
                '</html>';


class ResetController {
  constructor(){
    var reset = new Reset();
  }

  post(req,res){
    var reset = new Reset();
    var auth = new Auth();
    var user = new User();
    var theUser;
    var theAuth;
    var newPassword = generatePassword();

    console.log('Reset Post');

    user.findOne({email: req.body.email})
    .then((result)=> {
      theUser=result;
      if(result === null){
        responder.httpRespond(res, {code: responder.EMAIL_NOT_FOUND, detail:{}});
      }
      return auth.findOne({userid: theUser.id});
    })
    .then((result)=> {
      theAuth = new Auth(result);
      return request
        .get('https://www.google.com/recaptcha/api/siteverify?secret='+config.recaptcha.secret+'&response='+req.body.recaptcha);
    })
    .then((result)=>{

      // Generate a new password


      if (!result.body.success ) {
        responder.httpRespond(res, {code: responder.RECAPTCHA_ERROR, detail:{}});
      } else {
        var mailOptions = {
          from: '"CompMaster Admin" <support@compmaster.com.au>',
          to: req.body.email,
          subject: 'Your CompMaster Password has been reset',
          html: mailpart1+theAuth.username+mailpart1b+newPassword+mailpart2
        };
        return transporter.sendMail(mailOptions);

      }
    })
    .then((result)=>{
        responder.httpRespond(res, {code: responder.OK, detail:{}});
    })
    .then(()=>{
      theAuth.password = newPassword;
      theAuth.hash();
      return theAuth.save();
    })
    .catch((err)=>{
      console.log(err);
    })


  }
}



module.exports = ResetController;
