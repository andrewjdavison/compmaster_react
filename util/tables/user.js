var tableName = 'user';
var schema = [
  {name: "userName" ,type: "VARCHAR(100) NULL DEFAULT '0'", unique:true},
  {name: "password", type: "VARCHAR(100) NULL DEFAULT '0'"},
  {name: "email" , type:"VARCHAR(100) NOT NULL DEFAULT '0'"},
  {name: "firstName" , type: "VARCHAR(50) NULL DEFAULT '0'"},
  {name: "lastName" , type: "VARCHAR(100) NULL DEFAULT '0'"},
  {name: "loginAttempts" , type: "SMALLINT(5) UNSIGNED NULL DEFAULT '0'"},
  {name: "blocked", type:"TINYINT(4) NULL DEFAULT NULL"},
  {name: "userType", type:" TINYINT(4) NULL DEFAULT NULL"},
  {name: "permissions" , type: "SMALLINT(6) NULL DEFAULT NULL"},
  {name: "lastLogin" , type: "TIMESTAMP NULL DEFAULT '0000-00-00 00:00:00'"},
  {name: "lastLoginAttempt" , type: "TIMESTAMP NULL DEFAULT '0000-00-00 00:00:00'"},
  {name: "street1" ,type: "INT(11) UNSIGNED NOT NULL DEFAULT '0'"},
  {name: "street2" , type: "INT(11) UNSIGNED NOT NULL DEFAULT '0'"}
];

var table = require('./table_template')(tableName, schema);

module.exports = table;
