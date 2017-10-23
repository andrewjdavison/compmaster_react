'use strict';
var TableController = rootRequire('controllers/table');
var Cmadmin = rootRequire('models/cmadmin');

class CmadminController extends TableController {
  constructor(){
    var cmadmin = new Cmadmin();
    super(cmadmin);
  }
}

module.exports = CmadminController;
