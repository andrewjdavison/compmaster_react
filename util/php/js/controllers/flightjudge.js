'use strict';
var TableController = rootRequire('controllers/table');
var Flightjudge = rootRequire('models/flightjudge');

class FlightjudgeController extends TableController {
  constructor(){
    var flightjudge = new Flightjudge();
    super(flightjudge);
  }
}

module.exports = FlightjudgeController;
