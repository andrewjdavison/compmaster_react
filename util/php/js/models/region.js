"use strict";
var Table = rootRequire('common/table');

class Region extends Table {
    constructor(proto){
      super();
      this.tableName='region';
      this.schema = {
         regionName : { type: 'VARCHAR(100)', },
         regionLevel : { type: 'INT (11)',  notnull : true,},
         regionParent : { type: 'INT(11)',  notnull : true, value   : 0,},
         gst : { type: 'FLOAT',  notnull : true, value   : 0,},
         timezone : { type: 'VARCHAR (100)',  notnull : true,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Region;