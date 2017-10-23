"use strict";
var Table = rootRequire('common/table');

class Region extends Table {
    constructor(model){
      super({
              tableName:'region',
              schema : {
                 regionName : { type: 'VARCHAR(100)', },
                 regionLevel : { type: 'INT (11)',  notnull : true,},
                 regionParent : { type: 'INT(11)',  notnull : true, value   : 0,},
                 gst : { type: 'FLOAT',  notnull : true, value   : 0,},
                 timezone : { type: 'VARCHAR (100)',  notnull : true,},
            }
      });
      this.set(model);
  }
}

module.exports = Region;
