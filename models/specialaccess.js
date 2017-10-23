"use strict";
var Table = rootRequire('common/table');

class Specialaccess extends Table {
    constructor(model){
      super({
              tableName:'specialaccess',
              schema : {
                 compInstId : { type: 'INT(11)',  notnull : true,},
                 userId : { type: 'INT(11)',  notnull : true, value   : 0,},
                 expires : { type: 'TIMESTAMP',  notnull : true, value   : '2002-02-02 00:00:00',},
            }
      });
      this.set(model);
  }
}

module.exports = Specialaccess;
