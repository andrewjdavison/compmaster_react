var tableName= 'compjudge';
var schema = [
  {name: 'compInstId', type: 'INT (11) NOT NULL', origin: 'compinstid'},
  {name: 'categoryId', type: 'INT (11) NOT NULL', origin: 'categoryid' },
  {name: 'subcategoryId', type: 'INT (11) NOT NULL', origin: 'subcategoryid:w'},
  {name: 'judgeId', type: 'INT (11) NOT NULL'},
  {name: 'userId', type: 'INT (11) NOT NULL'},
];

var table = require('./table_template')(tableName, schema);

module.exports = table;
