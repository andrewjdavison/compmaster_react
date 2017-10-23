var tableName= 'entryresponse';
var schema = [
  {name: 'compInstId', type: 'INT (11) NOT NULL'},
  {name: 'entryId', type: 'INT (11) NOT NULL'},
  {name: 'questionId', type: 'INT (11) NOT NULL'},
  {name: 'response', type: 'VARCHAR (500) NOT NULL'},
];

var table = require('./table_template')(tableName, schema);

module.exports = table;
