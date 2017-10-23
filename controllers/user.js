'use strict';
var TableController = rootRequire('controllers/table');
var responder = rootRequire('common/responder');
var User = rootRequire('models/user');

class UserController extends TableController {
  constructor(){
    var user = new User();
    super(user);
  }

  findOne(req, res){
    // Copy the userId param into the id field for the generic search.
    console.log('Finding a singnle user');
    req.params.id = req.params.userId;
    super.findOne(req, res);
  }

  find(req, res){
    console.log(req.query);
    console.log('finding a user');
    if(req.query.email){
      var email = req.query.email;
      req.params.email={op:' LIKE ', data:email+'%'};
      req.returnFields=['id','email'];
    }
    super.find(req, res);
  }

  findEmail(req, res){
    console.log(req.query);
    console.log('------------------------------');
    console.log(req.params);

    var email = req.query.email;
    var firstName = req.query.firstName;
    var lastName = req.query.lastName;

    if(req.query.hasOwnProperty('email')){
      if(req.query.email.length < 4){
        responder.httpRespond(res, {code: responder.INVALID_PARAM});
        return;
      }
      req.params.email={op:' LIKE ', data:email+'%'};
    }
    if(req.query.hasOwnProperty('firstName')){
      if(req.query.firstName.length < 4){
        responder.httpRespond(res, {code: responder.INVALID_PARAM});
        return;
      }
      req.params.firstName={op:' LIKE ', data:firstName+'%'};
    }

    req.returnFields=['id','email', 'firstName', 'lastName'];
    res.pluralName="emails";

    super.find(req, res);

  }

  put(req, res){
    req.params.id = req.params.userId;
    console.log(req.body)
    console.log(req.params);
    super.put(req, res);

  }
}

module.exports = UserController;
