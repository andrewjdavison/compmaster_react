'use strict';
var TableController = rootRequire('controllers/table');
var Sponsor = rootRequire('models/sponsor');

class SponsorController extends TableController {
  constructor(){
    var sponsor = new Sponsor();
    super(sponsor);
  }
}

module.exports = SponsorController;
