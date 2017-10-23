"use strict";
var Table = rootRequire('common/table');

class Clubdiscount extends Table {
    constructor(model){
      super({
              tableName:'clubdiscount',
              schema : {
                 compInstId : { type: 'INT(11)',  notnull : true,},
                 clubId : { type: 'INT(11)',  notnull : true, value   : 0,},
            }
      });
      this.set(model);
  }
}

module.exports = Clubdiscount;
