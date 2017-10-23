"use strict";

var db = rootRequire('common/db');
var cmconst = rootRequire('common/const');
var config = require('config');
var responder = rootRequire('common/responder');
var TableController = rootRequire('controllers/table');

class ReportController extends TableController {
  constructor(){
    super({});
  }

  competitionStatus(req, response){
    var compInstId = req.params.compInstId;
    var results = [];
    response.pluralName = "competitionstatuses";
    var result = {title:'Competition Status Update'};

    var query = "SELECT COUNT(*) AS count FROM entry WHERE `compInstId`='"+compInstId+"' "+
                "AND `paid`>='1' and `cancelled`='0'";
    var report={};

    db.query(query)
    .then((result)=>{
      report.entries = result[0][0].count;
      throw('send');
    })
    .catch((err)=>{
      if(err == 'send'){
        results.push(report);
        super.sendResult(results, response);
      } else {
        console.log(err);
      }
    });


  }

  competitionReports(req, response){

    var compInstId = req.params.compInstId;
    var results = [];
    response.pluralName = "competitionreports";
    var result = {title:'Competition report'};

    var queryBase = "SELECT COUNT(*) AS count FROM entry WHERE `compInstId`='"+compInstId+"' ";
    var paidQuery = queryBase + "AND `paid`>='1'";// AND `cancelled`='0'";
    var entryQuery = queryBase ;
    var cancelledQuery = queryBase + "AND `cancelled`>='1'";
    var chargedQuery = "SELECT SUM(cost) AS charged FROM entry WHERE `compInstId`='"+compInstId+"' " +
                       "AND `paid`>='1'";
    var offlineQuery = queryBase + "AND `entryType`&"+cmconst.EntryType.offline+" ";
    var offlineCancelledQuery = offlineQuery + "AND `cancelled`='1'";
    var report={};
    var compInstance;
    var paypalFee;
    var compmasterFee;

    db.query(entryQuery)
    .then((result)=>{
      report.entries = result[0][0].count;
      return db.query(paidQuery);
    })
    .then((result)=>{
      report.paid = result[0][0].count;
      return db.query(offlineQuery);
    })
    .then((result)=>{
      report.offline= result[0][0].count;
      report.online = report.entries - report.offline;
      return db.query(cancelledQuery);
    })
    .then((result)=>{
      report.cancelled=result[0][0].count;
      return db.query(offlineCancelledQuery);
    })
    .then((result)=>{
      report.offlineCancelled = result[0][0].count;
      report.onlineCancelled = report.cancelled - report.offlineCancelled;

      if(!(req.permissions & cmconst.Permission.compReportFinancial)){
        throw('send');
      }
      return db.query("SELECT * FROM compinst WHERE `id`='"+compInstId+"';");
    })
    .then((result)=>{
      compInstance = result[0][0];
      return db.query(chargedQuery);
    })
    .then((result)=>{
      report.charged = result[0][0].charged/100*compInstance.gst;
      report.paypalFees = report.paid*compInstance.paypalFixedFee +
                          report.charged*compInstance.paypalVariableFee/100;
      report.compmasterFees = report.paid*compInstance.compmasterFixedFee +
                              report.charged*compInstance.compmasterVariableFee/100;

      throw('send');
    })
    .catch((err)=>{
      if(err == 'send'){
        results.push(report);
        super.sendResult(results, response);
      } else {
        console.log(err);
      }
    });





  }

};

module.exports = ReportController;
