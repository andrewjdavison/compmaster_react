'use strict';
var TableController = rootRequire('controllers/table');
var Compauth = rootRequire('models/compauth');

class CompauthController extends TableController {
  constructor(){
    var compauth = new Compauth();
    super(compauth);
  }
}

module.exports = CompauthController;
