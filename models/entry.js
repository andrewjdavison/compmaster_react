"use strict";
var Table = rootRequire('common/table');

class Entry extends Table {
    constructor(model){
      super({
              tableName:'entry',
              pluralName: 'entries',
              schema : {
                 compInstId : { type: 'INT (11)',  notnull : true,},
                 entryNumber : { type: 'INT (11)',  notnull : true,},
                 paymentPending : { type: 'TINYINT (1)',  notnull : true,},
                 paid : { type: 'TINYINT (1)',  notnull : true,},
                 entryDate : { type: 'TIMESTAMP',  notnull : true, value   : "CURRENT_TIMESTAMP",},
                 entryType : { type: 'INT (11)',  notnull : true,},
                 categoryId : { type: 'INT (11)',  notnull : true,},
                 subcategoryId : { type: 'INT (11)',  notnull : true,},
                 tie1 : { type: 'FLOAT (3)',  notnull : true,},
                 tie2 : { type: 'FLOAT (3)',  notnull : true,},
                 tie3 : { type: 'FLOAT (3)',  notnull : true,},
                 tie4 : { type: 'FLOAT (3)',  notnull : true,},
                 tie5 : { type: 'FLOAT (3)',  notnull : true,},
                 tie6 : { type: 'FLOAT (3)',  notnull : true,},
                 tie7 : { type: 'FLOAT (3)',  notnull : true,},
                 tie8 : { type: 'FLOAT (3)',  notnull : true,},
                 tie9 : { type: 'FLOAT (3)',  notnull : true,},
                 tie10 : { type: 'FLOAT (3)',  notnull : true,},
                 tiebreaker : { type: 'FLOAT (3)',  notnull : true,},
                 entrantId : { type: 'INT (11)',  notnull : true,},
                 securityId : { type: 'VARCHAR (50)',  notnull : true,},
                 cost : { type: 'INT (11)',  notnull : true,},
                 cancelled : { type: 'INT (11)',  notnull : true,},
                 clubId : { type: 'INT (11)',  notnull : true,},
                 flightOrder : { type: 'INT (11)',  notnull : true,},
                 totalScore : { type: 'FLOAT ',  notnull : true,},
                 rank : { type: 'INT (11)',  notnull : true,},
                 bulkTransactionId : { type: 'INT (11)',  notnull : true,},
                 scoreTemplateId : { type: 'INT (11)',  notnull : true,},
                 labelImage : { type: 'VARCHAR (300)',  notnull : true,},
                 flightId: {type: 'INT(11)', notnull:true,},
            }
      });
      this.set(model);
  }
}

module.exports = Entry;
