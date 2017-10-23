"use strict";
var Table = rootRequire('common/table');

var config = require('config');

class User extends Table {
  constructor(model){
    super({
            tableName:'user',
            schema : {
              firstName:          { type: 'VARCHAR(200)', notnull: true, },
              lastName:           { type: 'VARCHAR(200)', notnull: true, },
              street1:            { type: 'VARCHAR(200)', notnull: true, },
              street2:            { type: 'VARCHAR(200)', notnull: true, },
              city:               { type: 'VARCHAR(200)', notnull: true, },
              state:              { type: 'VARCHAR(200)', notnull: true, },
              country:            { type: 'VARCHAR(200)', notnull: true, },
              postcode:           { type: 'VARCHAR(200)', notnull: true, },
              email:              { type: 'VARCHAR(200)', notnull: true, unique:true},
              phone:              { type: 'VARCHAR(200)', notnull: true, },
              club:               { type: 'INT(11)', notnull: true, },
//              judgeId:            { type: 'VARCHAR(200)', notnull: true, },
//              judgeLevel:         { type: 'VARCHAR(200)', notnull: true, },
              receiveInvitations: { type: 'TINYINT (1)', notnull: true, },
//              receiveInvitations: { type: 'VARCHAR(200)', notnull: true, },
//              currentComp:        { type: 'VARCHAR(200)', notnull: true, },
              compInstId:         { type: 'VARCHAR(200)', notnull: true, },
              regionId:           { type: 'VARCHAR(200)', notnull: true, }
            }
    });
    this.set(model);

  }
}


module.exports = User;
