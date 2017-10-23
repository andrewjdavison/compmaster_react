var schema = [
  {name: 'compInstId', type: 'INT (11) NOT NULL'},
  {name: 'name', type: 'VARCHAR (100) NOT NULL'},
  {name: 'categoryId', type: 'INT (11) '},
  {name: 'subcategoryOrder', type: 'INT (11) '},
  {name: 'subcategoryCode', type: 'VARCHAR (100) NOT NULL'},
];
var tableName= 'subcategory';

var table = require('./table_template')(tableName, schema);

module.exports = table;
