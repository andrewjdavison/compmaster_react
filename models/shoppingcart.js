"use strict";
var Table = rootRequire('common/table');

class Shoppingcart extends Table {
    constructor(model){
      super({
              tableName:'shoppingcart',
              schema : {
                 paid : { type: 'INT(11)',  notnull : true,},
                 paymentDate : { type: 'TIMESTAMP',  notnull : true, value   : CURRENT_TIMESTAMP,},
                 price : { type: 'INT(11)', },
                 status : { type: 'INT(11)',  notnull : true,},
            }
      });
      this.set(model);
  }
}

module.exports = Shoppingcart;
