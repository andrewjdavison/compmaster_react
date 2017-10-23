var tableName = "compinstance";
var schema = [
  {name: 'compstate' , type: "TINYINT(3) NOT NULL DEFAULT '0'"},
  {name: 'name' , type: "VARCHAR(100) NOT NULL"},
  {name: 'address1' , type: "VARCHAR(200) NOT NULL"},
  {name: 'address2' , type: "VARCHAR(200) NOT NULL"},
  {name: 'city' , type: "VARCHAR(100) NOT NULL"},
  {name: 'state' , type: "VARCHAR(100) NOT NULL"},
  {name: 'postcode' , type: "VARCHAR(20) NOT NULL"},
  {name: 'country' , type: "VARCHAR(50) NOT NULL"},
  {name: 'mapRef' , type: "VARCHAR(200) NOT NULL"},
  {name: 'contactDetails' , type: "VARCHAR(200) NOT NULL"},
  {name: 'startDate' , type: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"},
  {name: 'endDate' , type: "TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00'"},
  {name: 'fullPrice' , type: "DECIMAL(10,2) NOT NULL DEFAULT '0.00'"},
  {name: 'onlineDiscount' , type: "DECIMAL(10,2) NOT NULL DEFAULT '0.00'"},
  {name: 'clubDiscount' , type: "DECIMAL(10,2) NOT NULL DEFAULT '0.00'"},
  {name: 'multipleDiscount' , type: "DECIMAL(10,2) NOT NULL DEFAULT '0.00'"},
  {name: 'categoryLabel' , type: "VARCHAR(100) NOT NULL DEFAULT '0'"},
  {name: 'categoryReq' , type: "INT(11) NOT NULL DEFAULT '0'"},
  {name: 'subcategoryLabel' , type: "VARCHAR(100) NOT NULL DEFAULT '0'"},
  {name: 'subcategoryReq' , type: "INT(11) NOT NULL DEFAULT '0'"},
  {name: 'entryOpenDate' , type: "TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00'"},
  {name: 'entryCloseDate' , type: "TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00'"},
  {name: 'scoresheetId' , type: "INT(11) NOT NULL DEFAULT '0'"},
  {name: 'scoreFilePattern' , type: "VARCHAR(50) NOT NULL DEFAULT '0'"},
  {name: 'paypalFixedFee' , type: "DECIMAL(10,2) NOT NULL DEFAULT '0.00'"},
  {name: 'paypalVariableFee' , type: "DECIMAL(10,2) NOT NULL DEFAULT '0.00'"},
  {name: 'compmasterFixedFee' , type: "DECIMAL(10,2) NOT NULL DEFAULT '0.00'"},
  {name: 'compmasterVariableFee' , type: "DECIMAL(10,2) NOT NULL DEFAULT '0.00'"},
  {name: 'gst' , type: "DECIMAL(10,2) NOT NULL DEFAULT '0.00'"},
  {name: 'entries' , type: "INT(11) NOT NULL DEFAULT '0'"},
  {name: 'entryLimit' , type: "INT(11) NOT NULL DEFAULT '0'"},
  {name: 'tallyMode' , type: "INT(11) NOT NULL DEFAULT '0'"},
  {name: 'signature' , type: "VARCHAR(50) NOT NULL DEFAULT '0'"},
  {name: 'offlineSignature' , type: "VARCHAR(50) NOT NULL DEFAULT '0'"},
  {name: 'scoresheetSig' , type: "VARCHAR(50) NOT NULL DEFAULT '0'"},
  {name: 'scoresheetVersion' , type: "INT(11) NOT NULL DEFAULT '0'"},
  {name: 'resultsPublished' , type: "TINYINT(4) NOT NULL DEFAULT '0'"},
  {name: 'requestingStaff' , type: "TINYINT(4) NOT NULL DEFAULT '0'"},
  {name: 'requestingJudges' , type: "TINYINT(4) NOT NULL DEFAULT '0'"},
  {name: 'requestingJudgeAssistants' , type: "TINYINT(4) NOT NULL DEFAULT '0'"},
  {name: 'allowUnpaid' , type: "TINYINT(4) NOT NULL DEFAULT '0'"},
  {name: 'lockScoresheet' , type: "TINYINT(4) NOT NULL DEFAULT '0'"},
  {name: 'validResults' , type: "TINYINT(4) NOT NULL DEFAULT '0'"},
  {name: 'lockOfflineSheet' , type: "TINYINT(4) NOT NULL DEFAULT '0'"},
  {name: 'showSponsors' , type: "TINYINT(4) NOT NULL DEFAULT '0'"},
  {name: 'hideAdmin' , type: "TINYINT(4) NOT NULL DEFAULT '0'"},
  {name: 'scoresheetsReady' , type: "TINYINT(4) NOT NULL DEFAULT '0'"},
];


var table = require('./table_template')(tableName, schema);

module.exports = table;
