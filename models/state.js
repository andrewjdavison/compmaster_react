"use strict";
var Table = rootRequire('common/table');

class State extends Table {
  constructor(model){
    super({
            tableName:'state',
            schema : {
              name:           { type: 'VARCHAR(200)', notnull: true },
              countryId:      { type: 'INT(11)', notnull: true},
              coordinates:    { type: 'VARCHAR(200)', notnull: true },
            }
    });
    this.set(model);

  }
}


module.exports = State;
