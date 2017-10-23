'use strict';
var TableController = rootRequire('controllers/table');
var Country = rootRequire('models/country');
var State = rootRequire('models/state');
//var Countries = rootRequire('common/countries');

var responder = rootRequire('common/responder');

class CountryController extends TableController {
  constructor(){
    var country = new Country();
    super(country);
  }

}

module.exports = CountryController;
