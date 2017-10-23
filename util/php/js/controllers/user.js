'use strict';
var TableController = rootRequire('controllers/table');
var User = rootRequire('models/user');

class UserController extends TableController {
  constructor(){
    var user = new User();
    super(user);
  }
}

module.exports = UserController;
