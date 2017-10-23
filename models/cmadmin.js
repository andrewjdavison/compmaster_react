"use strict";
var Table = rootRequire('common/table');

class Cmadmin extends Table {
    constructor(model){
      super({
              tableName:'cmadmin',
              schema : {
                 paypalFixedFee : { type: 'FLOAT',  notnull : true,},
                 paypalVariableFee : { type: 'FLOAT',  notnull : true,},
                 compmasterFixedFee : { type: 'FLOAT',  notnull : true,},
                 compmasterVariableFee : { type: 'FLOAT',  notnull : true,},
            }
      });
      this.set(model);
  }
}

module.exports = Cmadmin;
