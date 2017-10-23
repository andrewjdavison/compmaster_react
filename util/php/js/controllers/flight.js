'use strict';
var TableController = rootRequire('controllers/table');
var Flight = rootRequire('models/flight');

class FlightController extends TableController {
  constructor(){
    var flight = new Flight();
    super(flight);
  }
}

module.exports = FlightController;
