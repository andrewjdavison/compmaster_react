var tableName= 'entry';
var schema = [
  {name: 'compInstId', type: 'INT (11) NOT NULL'},
  {name: 'entryNumber', type: 'INT (11) NOT NULL'},
  {name: 'paymentPending', type: 'TINYINT (1) NOT NULL'},
  {name: 'paid', type: 'TINYINT (1) NOT NULL'},
  {name: 'entryDate', type: 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP'},
  {name: 'entryType', type: 'INT (11) NOT NULL '},
  {name: 'categoryId', type: 'INT (11) NOT NULL '},
  {name: 'subcategoryId', type: 'INT (11) NOT NULL '},
  {name: 'tie1', type: 'INT (3) NOT NULL'},
  {name: 'tie2', type: 'INT (3) NOT NULL'},
  {name: 'tie3', type: 'INT (3) NOT NULL'},
  {name: 'tie4', type: 'INT (3) NOT NULL'},
  {name: 'tie5', type: 'INT (3) NOT NULL'},
  {name: 'tie6', type: 'INT (3) NOT NULL'},
  {name: 'tie7', type: 'INT (3) NOT NULL'},
  {name: 'tie8', type: 'INT (3) NOT NULL'},
  {name: 'tie9', type: 'INT (3) NOT NULL'},
  {name: 'tie10', type: 'INT (3) NOT NULL'},
  {name: 'entrantId', type: 'INT (11) NOT NULL'},
  {name: 'securityId', type: 'VARCHAR (50) NOT NULL'},
  {name: 'cost', type: 'INT (11) NOT NULL'},
  {name: 'cancelled', type: 'INT (11) NOT NULL'},
  {name: 'clubId', type: 'INT (11) NOT NULL'},
  {name: 'flightOrder', type: 'INT (11) NOT NULL'},
  {name: 'totalScore', type: 'FLOAT  NOT NULL'},
  {name: 'adminRank', type: 'INT (11)  NOT NULL'},
  {name: 'bulkTransactionId', type: 'INT (11)  NOT NULL'},
  {name: 'labelImage', type: 'VARCHAR (300)  NOT NULL'},
];

var table = require('./table_template')(tableName, schema);

module.exports = table;
