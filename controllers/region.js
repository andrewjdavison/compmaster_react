'use strict';
var TableController = rootRequire('controllers/table');
var Region = rootRequire('models/region');

class RegionController extends TableController {
  constructor(){
    var region = new Region();
    super(region);
  }
}

module.exports = RegionController;
