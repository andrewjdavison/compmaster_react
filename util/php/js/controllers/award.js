'use strict';
var TableController = rootRequire('controllers/table');
var Award = rootRequire('models/award');

class AwardController extends TableController {
  constructor(){
    var award = new Award();
    super(award);
  }
}

module.exports = AwardController;
