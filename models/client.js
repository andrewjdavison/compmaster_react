"use strict";
var Table = rootRequire('common/table');

var bcrypt = require('bcryptjs');
var config = require('config');
var bcryptAsPromised = require('bcrypt-as-promised');


class Client extends Table {
  constructor(model){
    super({
            tableName:'client',
            schema : {
              userid: { type: 'INT(11)', notnull: true, },
              password: { type: 'VARCHAR(200)', notnull: true, }
            }
    });
    this.set(model);
  }
}


module.exports = Client;
