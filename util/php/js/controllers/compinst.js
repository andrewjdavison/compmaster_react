'use strict';
var TableController = rootRequire('controllers/table');
var Compinst = rootRequire('models/compinst');

class CompinstController extends TableController {
  constructor(){
    var compinst = new Compinst();
    super(compinst);
  }
}

module.exports = CompinstController;
