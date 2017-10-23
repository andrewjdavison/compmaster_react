var tableName= 'flightjudge';
var schema = [
  {name: 'compInstId', type: 'INT (11) NOT NULL'},
  {name: 'flightId', type: 'INT (11) NOT NULL'},
  {name: 'judgeId', type: 'INT (11) NOT NULL'},
];

var table = require('./table_template')(tableName, schema);

module.exports = table;
