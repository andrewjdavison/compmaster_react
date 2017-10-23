var tableName= 'compquestions';
var schema = [
  {name: 'compInstId', type: 'INT (11) NOT NULL', unique: true},
  {name: 't1', type: 'INT (11) NOT NULL'},
  {name: 't2', type: 'INT (11) NOT NULL'},
  {name: 't3', type: 'INT (11) NOT NULL'},
  {name: 't4', type: 'INT (11) NOT NULL'},
  {name: 't5', type: 'INT (11) NOT NULL'},
  {name: 't6', type: 'INT (11) NOT NULL'},
  {name: 'sn1', type: 'INT (11) NOT NULL'},
  {name: 'sn2', type: 'INT (11) NOT NULL'},
  {name: 'sn3', type: 'INT (11) NOT NULL'},
  {name: 'sn4', type: 'INT (11) NOT NULL'},
  {name: 'bn1', type: 'INT (11) NOT NULL'},
  {name: 'bn2', type: 'INT (11) NOT NULL'},
];

var table = require('./table_template')(tableName, schema);

module.exports = table;
