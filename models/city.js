"use strict";
var Table = rootRequire('common/table');

class City extends Table {
  constructor(model){
    super({
            tableName:'city',
            schema : {
              stateid:          { type: 'INT(11)', notnull: true },
              name:             { type: 'VARCHAR(200)', notnull: true},
              coordinates:      { type: 'VARCHAR(200)', notnull: true},
            }
    });
    this.set(model);

  }
}


module.exports = City;
