'use strict';
var TableController = rootRequire('controllers/table');
var Staff = rootRequire('models/staff');

class StaffController extends TableController {
  constructor(){
    var staff = new Staff();
    super(staff);
  }
}

module.exports = StaffController;
