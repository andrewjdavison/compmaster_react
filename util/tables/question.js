var tableName = "question";
var schema = [
  {name: "compInstId",          type: "INT(11) NOT NULL"},
  {name: "questionType",        type: "TINYINT(3) NOT NULL"},
  {name: "label",               type: "VARCHAR(100) NOT NULL"},
  {name: "required",            type: "TINYINT(1) NOT NULL DEFAULT '0'"},
  {name: "formOrder",           type: "INT(11) NOT NULL DEFAULT '0'"},
  {name: "defaultValue",        type: "INT(2) NOT NULL DEFAULT '0'"},
  {name: "viewOnJudging",       type: "INT(11) NOT NULL DEFAULT '0'"},
  {name: "viewOnRunningSheet",  type: "INT(11) NOT NULL DEFAULT '0'"},
  {name: "viewOnReport",        type: "INT(11) NOT NULL DEFAULT '0'"},
  {name: "description",         type: "VARCHAR(100) NOT NULL"},
  {name: "viewOnLabel",         type: "TINYINT(1) NOT NULL DEFAULT '0'"},
  {name: "offlineWeight",       type: "INT(11) NOT NULL DEFAULT '0'"},
  {name: "used",                type: "TINYINT(1) NOT NULL DEFAULT '0'"},
  {name: "usedOffline",         type: "TINYINT(1) NOT NULL DEFAULT '0'"},
  {name: "radioOptions",        type: "VARCHAR(100) NOT NULL"},
];


var table = require('./table_template')(tableName, schema);

module.exports = table;
