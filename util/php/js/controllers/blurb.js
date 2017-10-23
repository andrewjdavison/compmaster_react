'use strict';
var TableController = rootRequire('controllers/table');
var Blurb = rootRequire('models/blurb');

class BlurbController extends TableController {
  constructor(){
    var blurb = new Blurb();
    super(blurb);
  }
}

module.exports = BlurbController;
