var tableName= 'flight';
var schema = [
  {name: 'compInstId', type: 'INT (11) NOT NULL'},
  {name: 'notes', type: 'VARCHAR (500) NOT NULL'},
  {name: 'judges', type: 'INT (11) NOT NULL'},
  {name: 'categoryId', type: 'INT (11) NOT NULL'},
  {name: 'subcategoryId', type: 'INT (11) NOT NULL'},
];

var table = require('./table_template')(tableName, schema);

module.exports = table;
