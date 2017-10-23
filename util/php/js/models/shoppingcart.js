"use strict";
var Table = rootRequire('common/table');

class Shoppingcart extends Table {
    constructor(proto){
      super();
      this.tableName='shoppingcart';
      this.schema = {
         paid : { type: 'INT(11)',  notnull : true,},
         paymentDate : { type: 'TIMESTAMP',  notnull : true, value   : CURRENT_TIMESTAMP,},
         price : { type: 'INT(11)', },
         status : { type: 'INT(11)',  notnull : true,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Shoppingcart;