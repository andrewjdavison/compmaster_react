"use strict";
var Table = rootRequire('common/table');

class Question extends Table {
    constructor(model){
      super({
              tableName:'question',
              schema : {
                 compInstId : { type: 'INT(11)',  notnull : true,},
                 questionType : { type: 'INT(3)',  notnull : true,},
                 label : { type: 'VARCHAR(100)',  notnull : true,},
                 required : { type: 'INT(1)',  notnull : true, value   : 0,},
                 formOrder : { type: 'INT(11)',  notnull : true, value   : 0,},
                 defaultValue : { type: 'VARCHAR(200)',  notnull : true, value   : 0,},
                 viewOnJudging : { type: 'INT(11)',  notnull : true, value   : 0,},
                 viewOnRunningSheet : { type: 'INT(11)',  notnull : true, value   : 0,},
                 viewOnReport : { type: 'INT(11)',  notnull : true, value   : 0,},
                 description : { type: 'VARCHAR(100)',  notnull : true,},
                 viewOnLabel : { type: 'INT(1)',  notnull : true, value   : 0,},
                 offlineWeight : { type: 'INT(11)',  notnull : true, value   : 0,},
                 used : { type: 'INT(1)',  notnull : true, value   : 0,},
                 usedOffline : { type: 'INT(1)',  notnull : true, value   : 0,},
                 radioOptions : { type: 'VARCHAR(100)',  notnull : true,},
                 questionPage : { type: 'INT(11)',  notnull : true,},
                 dataPattern : { type: "VARCHAR(100)", notnull: true, value:"",},
                 dataPatternDescription: { type: "VARCHAR(200)", notnull: true, value:"",},
            }
      });
      this.set(model);
  }
}

module.exports = Question;
