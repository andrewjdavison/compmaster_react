'use strict';
var TableController = rootRequire('controllers/table');
var Auth = rootRequire('models/auth');

class AuthController extends TableController {
  constructor(){
    var auth = new Auth();
    super(auth);
  }
}

module.exports = AuthController;
