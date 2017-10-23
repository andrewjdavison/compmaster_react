schema = [
  {name: 'compInstId', type: 'INT (11) NOT NULL'},
  {name: 'name', type: 'VARCHAR (100) NOT NULL'},
  {name: 'categoryCode', type: 'VARCHAR (100) NOT NULL'},
  {name: 'firstPrize', type: 'VARCHAR (300) '},
  {name: 'secondPrize', type: 'VARCHAR (300) '},
  {name: 'thirdPrize', type: 'VARCHAR (300) '},
  {name: 'displayOrder', type: 'INT (11) NOT NULL'}
];
tableName= 'category';


var table = require('./table_template')(tableName, schema);

module.exports = table;
