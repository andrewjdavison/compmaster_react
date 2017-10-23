'use strict';
var TableController = rootRequire('controllers/table');
var Compsponsor = rootRequire('models/compsponsor');

class CompsponsorController extends TableController {
  constructor(){
    var compsponsor = new Compsponsor();
    super(compsponsor);
  }
}

module.exports = CompsponsorController;
