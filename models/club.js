"use strict";
var Table = rootRequire('common/table');

class Club extends Table {
    constructor(model){
      super({
              tableName:'club',
              schema : {
                 name : { type: 'VARCHAR(100)',  notnull : true,},
                 regionId : { type: 'INT(11)',  notnull : true,},
                 displayOrder : { type: 'INT (11)',  notnull : true, value   : 0,},
                 img : { type: 'VARCHAR(100)',  notnull : true,},
               }
      });
      this.set(model);
    }
}

module.exports = Club;
