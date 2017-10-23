"use strict";
var Table = rootRequire('common/table');

class Country extends Table {
  constructor(model){
    super({
            tableName:'country',
            pluralName:'countries',
            schema : {
              name:         { type: 'VARCHAR(200)', notnull: true },
              code:         { type: 'VARCHAR(200)', notnull: true },
            }
    });
    this.set(model);
  }
}


module.exports = Country;
