var tableName= 'clubdiscount';
var schema = [
  {name: 'compInstId', type: 'INT (11) NOT NULL', origin: 'compinstid'},
  {name: 'clubId', type: 'INT (11) NOT NULL', origin: 'clubid' },
];

var table = require('./table_template')(tableName, schema);

module.exports = table;
