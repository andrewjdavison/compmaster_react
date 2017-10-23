var tableName= 'sponsor';
var schema = [
  {name: 'name', type: 'VARCHAR (100) NOT NULL'},
  {name: 'blurb', type: 'VARCHAR (500) NOT NULL'},
  {name: 'smLink', type: 'VARCHAR (300) NOT NULL'},
  {name: 'lgLink', type: 'VARCHAR (300) NOT NULL'},
  {name: 'smImg', type: 'VARCHAR (300) NOT NULL'},
  {name: 'lgImg', type: 'VARCHAR (300) NOT NULL'},
  {name: 'useLink', type: 'INT (11) '},
  {name: 'clickthrough', type: 'VARCHAR (300) NOT NULL'},
];

var table = require('./table_template')(tableName, schema);

module.exports = table;
