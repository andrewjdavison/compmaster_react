"use strict";
var Table = rootRequire('common/table');

class User extends Table {
    constructor(proto){
      super();
      this.tableName='user';
      this.schema = {
         firstName : { type: 'VARCHAR(50)',  value   : 0,},
         lastName : { type: 'VARCHAR (100)',  value   : 0,},
         street1 : { type: 'VARCHAR (100)',  value   : "",},
         street2 : { type: 'VARCHAR (100)',  value   : "",},
         city : { type: 'VARCHAR (100)',  value   : "",},
         state : { type: 'VARCHAR (100)',  value   : "",},
         country : { type: 'VARCHAR (100)',  value   : "",},
         postcode : { type: 'VARCHAR (100)',  value   : "",},
         phone : { type: 'VARCHAR (100)',  value   : "",},
         club : { type: 'INT (11)',  value   : 0,},
         judgeId : { type: 'INT (11)',  value   : 0,},
         judgeLevel : { type: 'INT (11)',  value   : 0,},
         receiveInvitations : { type: 'TINYINT (3)',  value   : 0,},
         compInstId : { type: 'INT (11)',  value   : 0,},
         regionId : { type: 'INT (11)',  value   : 0,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
}

module.exports = User;