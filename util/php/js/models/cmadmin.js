"use strict";
var Table = rootRequire('common/table');

class Cmadmin extends Table {
    constructor(proto){
      super();
      this.tableName='cmadmin';
      this.schema = {
         paypalFixedFee : { type: 'FLOAT',  notnull : true,},
         paypalVariableFee : { type: 'FLOAT',  notnull : true,},
         compmasterFixedFee : { type: 'FLOAT',  notnull : true,},
         compmasterVariableFee : { type: 'FLOAT',  notnull : true,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Cmadmin;