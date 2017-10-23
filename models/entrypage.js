"use strict";
var Table = rootRequire('common/table');

class Entrypage extends Table {
    constructor(model){
      super({
              tableName:'entrypage',
              schema : {
                 compInstId : { type: 'INT(11)',  notnull : true,},
                 questionType : { type: 'TINYINT(3)',  notnull : true,},
                 label : { type: 'VARCHAR(100)',  notnull : true,},
                 required : { type: 'TINYINT(1) ',  notnull : true, value   : 0,},
                 formOrder : { type: 'INT(11)',  notnull : true, value   : 0,},
                 defaultValue : { type: 'INT(2) ',  notnull : true, value   : 0,},
                 viewOnJudging : { type: 'INT(11) ',  notnull : true, value   : 0,},
                 viewOnRunningSheet : { type: 'INT(11) ',  notnull : true, value   : 0,},
                 viewOnReport : { type: 'INT(11) ',  notnull : true, value   : 0,},
                 description : { type: 'VARCHAR(100) ',  notnull : true,},
                 viewOnLabel : { type: 'TINYINT(1) ',  notnull : true, value   : 0,},
                 offlineWeight : { type: 'INT(11) ',  notnull : true, value   : 0,},
                 used : { type: 'TINYINT(1) ',  notnull : true, value   : 0,},
                 usedOffline : { type: 'TINYINT(1) ',  notnull : true, value   : 0,},
                 radioOptions : { type: 'VARCHAR(100)',  notnull : true,},
            }
      });
      this.set(model);
  }
}

module.exports = Entrypage;
