"use strict";
var Table = rootRequire('common/table');

class Staff extends Table {
    constructor(model){
      super({
              tableName:'staff',
              schema : {
                 compInstId : { type: 'INT(11)',  notnull : true,},
                 userId : { type: 'INT(11)',  notnull : true, value   : 0,},
                 role : { type: 'INT(11)', notnull: true, value: 0,},
                 staffId: { type: 'INT(11)', notnull: true, value: 0,},
                 notes : { type: 'VARCHAR(500)', },
            }
      });
      this.set(model);
  }
}

module.exports = Staff;
