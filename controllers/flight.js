'use strict';
var TableController = rootRequire('controllers/table');
var Flight = rootRequire('models/flight');
var responder = rootRequire('common/responder');
var Judge = rootRequire('models/compjudge');
var Entry = rootRequire('models/entry');

class FlightController extends TableController {
  constructor(){
    var flight = new Flight();
    super(flight);
  }

  newFlight(req, res) {
    if(('id' in req.params)&&(req.query.hasOwnProperty('categoryId'))){
      var flight = new Flight();
      flight.compInstId = req.params.id;
      flight.name="New Flight"
      flight.notes="";
      flight.judges=0;
      flight.categoryId = req.query.categoryId;
      flight.subcategoryId = 0;
      flight.startDatetime = new Date();
      flight.endDatetime = new Date();
      return flight.save()
      .then((result)=>{
        var responseData={};
//        console.log(responseData);
        responseData['flights'] = [result];
        responder.httpRespond(res, {code: responder.OK, detail: responseData});
      });
    } else {
      responder.httpRespond(res, {code:responder.INVALID_PARAMS});
    }
  }

  findCompFlights(req, res){

    var search={};

    let judges = new Judge();
    let entries= new Entry();

    var promises1=[];
    var promises2=[];

    if('compInstId' in req.query){
 //     console.log('found compInstId');
      search = {compInstId: req.query.compInstId};
    }
    /*
    else {
      responser.httpRespond(res, {code: responder.INVALID_PARAM});
    */

    var flights={};
    let entriesTable=[];
    let judgesTable=[];

    return this.proto.find(search)
    .then((result)=> {
      flights = result;

      for(let i=0;i<flights.length;i++){
        let flightId = flights[i].id;
//        console.log('Flight ID: '+flightId);
        flights[i].judges=[];
        flights[i].entries=[];

        promises1.push(judges.find({flightId: flightId}));
        promises2.push(entries.find({flightId: flightId}));
      }

      // Find all the judges in this flight

      return Promise.all(promises1);
    })
    .then((result)=>{
      // Iterate over the results and drop the ids into the flight...

      for(let i=0;i<result.length;i++){
        let tmpJudges=[];
        var flightId=0;
        for(let j=0;j<result[i].length;j++){
          flightId=result[i][j].flightId;
          let flight = flights.filter(function(obj){
            return obj.id == flightId;
          });
 //         flight[0].judges.push(result[i][j].id);
        }
      }

      return Promise.all(promises2);
    })
    .then((result)=>{

      // Find all the entries

      for(let i=0;i<result.length;i++){
        let tmpJudges=[];
        var flightId=0;
        for(let j=0;j<result[i].length;j++){
          flightId=result[i][j].flightId;
          let flight = flights.filter(function(obj){
            return obj.id == flightId;
          });
//          flight[0].entries.push(result[i][j].id);
        }
      }

      return result;
    })
    .then((result)=>{
      var responseData={};
      responseData['flights'] = flights;
      responder.httpRespond(res, {code: responder.OK, detail: responseData});
    })
    .catch((err)=>{
      console.log(err);
      responder.httpRespond(res, {code: responder.DB_ERR});
    });

  }
}

module.exports = FlightController;
