"use strict";
var Table = rootRequire('common/table');

var bcrypt = require('bcrypt');
var config = require('config');
var bcryptAsPromised = require('bcrypt-as-promised');

class Auth extends Table {
    constructor(proto){
      super();
      this.tableName='auth';
      this.schema = {
         userid : { type: 'INT(11)',  notnull : true, unique  : true,},
         username : { type: 'VARCHAR(100)',  notnull : true, value   : null, unique  : true,},
         password : { type: 'VARCHAR(100)',  notnull : true, value   : "",},
         usertype : { type: 'INT(11)',  notnull : true, value   : null,},
         email : { type: 'VARCHAR(100)',  notnull : true, value   : null,},
         blocked : { type: 'INT(11)',  notnull : true, value   : null,},
         suspectUser : { type: 'INT(11)',  notnull : true, value   : null,},
         permissions : { type: 'INT(11)',  notnull : true, value   : null,},
         lastLogin : { type: 'TIMESTAMP',  notnull : true, value   : 0000-00-00 00:00:00,},
         lastLoginattempt : { type: 'TIMESTAMP',  notnull : true, value   : 0000-00-00 00:00:00,},
         loginAttempts : { type: 'INT(11)',  notnull : true, value   : 0,},
    };
    if(typeof proto !== 'undefined'){
      this.set(proto);
     }
  }
  verifyPassword(password){
    return bcryptAsPromised.compare(password, this.password)
    .then((res)=>{
      return res;
    })
    .catch((err)=>{
      if(err.name == 'MismatchError'){
        return false;
      } else {
        throw new Error(err);
      }
    });
  }

  hash(){
    this.password=bcrypt.hashSync(this.password,10);
  };

  compare(password){
    return bcrypt.compareSync(password, this.password);
  };
}

module.exports = Auth;