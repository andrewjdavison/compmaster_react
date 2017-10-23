'use strict';
var TableController = rootRequire('controllers/table');
var Specialaccess = rootRequire('models/specialaccess');

class SpecialaccessController extends TableController {
  constructor(){
    var specialaccess = new Specialaccess();
    super(specialaccess);
  }
}

module.exports = SpecialaccessController;
