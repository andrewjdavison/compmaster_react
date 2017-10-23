"use strict";
var Table = rootRequire('common/table');

class Flight extends Table {
    constructor(model){
      super({
              tableName:'flight',
              schema : {
                 compInstId : { type: 'INT(11)',  notnull : true,},
                 name: { type: 'VARCHAR(500)',  notnull : true,},
                 notes : { type: 'VARCHAR(500)',  notnull : true,},
                 judges : { type: 'INT(11)',  notnull : true, value   : 0,},
                 categoryId : { type: 'INT(11)',  notnull : true, value   : 0,},
                 subcategoryId : { type: 'INT(11)',  notnull : true, value   : 0,},
                 startDatetime: { type: 'TIMESTAMP',  notnull : true, value   : '2000-01-01 00:00:00',},
                 endDatetime: { type: 'TIMESTAMP',  notnull : true, value   : '2000-01-01 00:00:00',},
            }
      });
      this.set(model);
  }
}

module.exports = Flight;
