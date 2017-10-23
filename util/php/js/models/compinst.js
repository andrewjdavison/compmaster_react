"use strict";
var Table = rootRequire('common/table');

class Compinst extends Table {
    constructor(proto){
      super();
      this.tableName='compinst';
      this.schema = {
         compstate : { type: 'TINYINT(3)',  notnull : true, value   : 0,},
         name : { type: 'VARCHAR(100)',  notnull : true,},
         address1 : { type: 'VARCHAR(200)',  notnull : true,},
         address2 : { type: 'VARCHAR(200)',  notnull : true,},
         city : { type: 'VARCHAR(100)',  notnull : true,},
         state : { type: 'VARCHAR(100)',  notnull : true,},
         postcode : { type: 'VARCHAR(20)',  notnull : true,},
         country : { type: 'VARCHAR(50)',  notnull : true,},
         mapRef : { type: 'VARCHAR(200)',  notnull : true,},
         contactDetails : { type: 'VARCHAR(200)',  notnull : true,},
         startDate : { type: 'TIMESTAMP',  notnull : true, value   : CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,},
         endDate : { type: 'TIMESTAMP',  notnull : true, value   : 0000-00-00 00:00:00,},
         fullPrice : { type: 'DECIMAL(10,2)',  notnull : true, value   : 0.00,},
         onlineDiscount : { type: 'DECIMAL(10,2)',  notnull : true, value   : 0.00,},
         clubDiscount : { type: 'DECIMAL(10,2)',  notnull : true, value   : 0.00,},
         multipleDiscount : { type: 'DECIMAL(10,2)',  notnull : true, value   : 0.00,},
         categoryLabel : { type: 'VARCHAR(100)',  notnull : true, value   : 0,},
         categoryReq : { type: 'INT(11)',  notnull : true, value   : 0,},
         subcategoryLabel : { type: 'VARCHAR(100)',  notnull : true, value   : 0,},
         subcategoryReq : { type: 'INT(11)',  notnull : true, value   : 0,},
         entryOpenDate : { type: 'TIMESTAMP',  notnull : true, value   : 0000-00-00 00:00:00,},
         entryCloseDate : { type: 'TIMESTAMP',  notnull : true, value   : 0000-00-00 00:00:00,},
         scoresheetId : { type: 'INT(11)',  notnull : true, value   : 0,},
         scoreFilePattern : { type: 'VARCHAR(50)',  notnull : true, value   : 0,},
         paypalFixedFee : { type: 'DECIMAL(10,2)',  notnull : true, value   : 0.00,},
         paypalVariableFee : { type: 'DECIMAL(10,2)',  notnull : true, value   : 0.00,},
         compmasterFixedFee : { type: 'DECIMAL(10,2)',  notnull : true, value   : 0.00,},
         compmasterVariableFee : { type: 'DECIMAL(10,2)',  notnull : true, value   : 0.00,},
         gst : { type: 'DECIMAL(10,2)',  notnull : true, value   : 0.00,},
         entries : { type: 'INT(11)',  notnull : true, value   : 0,},
         entryLimit : { type: 'INT(11)',  notnull : true, value   : 0,},
         tallyMode : { type: 'INT(11)',  notnull : true, value   : 0,},
         signature : { type: 'VARCHAR(50)',  notnull : true, value   : 0,},
         offlineSignature : { type: 'VARCHAR(50)',  notnull : true, value   : 0,},
         scoresheetSig : { type: 'VARCHAR(50)',  notnull : true, value   : 0,},
         scoresheetVersion : { type: 'INT(11)',  notnull : true, value   : 0,},
         resultsPublished : { type: 'TINYINT(4)',  notnull : true, value   : 0,},
         requestingStaff : { type: 'TINYINT(4)',  notnull : true, value   : 0,},
         requestingJudges : { type: 'TINYINT(4)',  notnull : true, value   : 0,},
         requestingJudgeAssistants : { type: 'TINYINT(4)',  notnull : true, value   : 0,},
         allowUnpaid : { type: 'TINYINT(4)',  notnull : true, value   : 0,},
         lockScoresheet : { type: 'TINYINT(4)',  notnull : true, value   : 0,},
         validResults : { type: 'TINYINT(4)',  notnull : true, value   : 0,},
         lockOfflineSheet : { type: 'TINYINT(4)',  notnull : true, value   : 0,},
         showSponsors : { type: 'TINYINT(4)',  notnull : true, value   : 0,},
         hideAdmin : { type: 'TINYINT(4)',  notnull : true, value   : 0,},
         scoresheetsReady : { type: 'TINYINT(4)',  notnull : true, value   : 0,},
         regionId : { type: 'INT(11)',  notnull : true, value   : 0,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Compinst;
