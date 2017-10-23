"use strict";
var Table = rootRequire('common/table');

class Scoretemplate extends Table {
    constructor(proto){
      super();
      this.tableName='scoretemplate';
      this.schema = {
         scoresheetName : { type: 'VARCHAR(200)',  notnull : true,},
         s1label : { type: 'VARCHAR(100)',  notnull : true,},
         s1max : { type: 'INT (11)',  notnull : true,},
         s1tie : { type: 'INT (11)',  notnull : true,},
         s2label : { type: 'VARCHAR(100)',  notnull : true,},
         s2max : { type: 'INT (11)',  notnull : true,},
         s2tie : { type: 'INT (11)',  notnull : true,},
         s3label : { type: 'VARCHAR(100)',  notnull : true,},
         s3max : { type: 'INT (11)',  notnull : true,},
         s3tie : { type: 'INT (11)',  notnull : true,},
         s4label : { type: 'VARCHAR(100)',  notnull : true,},
         s4max : { type: 'INT (11)',  notnull : true,},
         s4tie : { type: 'INT (11)',  notnull : true,},
         s5label : { type: 'VARCHAR(100)',  notnull : true,},
         s5max : { type: 'INT (11)',  notnull : true,},
         s5tie : { type: 'INT (11)',  notnull : true,},
         s6label : { type: 'VARCHAR(100)',  notnull : true,},
         s6max : { type: 'INT (11)',  notnull : true,},
         s6tie : { type: 'INT (11)',  notnull : true,},
         s7label : { type: 'VARCHAR(100)',  notnull : true,},
         s7max : { type: 'INT (11)',  notnull : true,},
         s7tie : { type: 'INT (11)',  notnull : true,},
         s8label : { type: 'VARCHAR(100)',  notnull : true,},
         s8max : { type: 'INT (11)',  notnull : true,},
         s8tie : { type: 'INT (11)',  notnull : true,},
         s9label : { type: 'VARCHAR(100)',  notnull : true,},
         s9max : { type: 'INT (11)',  notnull : true,},
         s9tie : { type: 'INT (11)',  notnull : true,},
         s10label : { type: 'VARCHAR(100)',  notnull : true,},
         s10max : { type: 'INT (11)',  notnull : true,},
         s10tie : { type: 'INT (11)',  notnull : true,},
         image : { type: 'VARCHAR(100)',  notnull : true, value   : "",},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = Scoretemplate;