"use strict";
var Table = rootRequire('common/table');

var bcrypt = require('bcryptjs');
var config = require('config');
var bcryptAsPromised = require('bcrypt-as-promised');


class Auth extends Table {
  constructor(model){
    super({
            tableName:'auth',
            schema : {
              userid:           { type: 'VARCHAR(200)', notnull: true },
              username:         { type: 'VARCHAR(200)', notnull: true, unique: true, value: null },
              password:         { type: 'VARCHAR(200)', notnull: true, value: null },
              usertype:         { type: 'VARCHAR(200)', notnull: true, value: null },
              blocked:          { type: 'VARCHAR(200)', notnull: true, value: null },
              suspectUser:      { type: 'VARCHAR(200)', notnull: true, value: null },
              permissions:      { type: 'VARCHAR(200)', notnull: true, value: 0 },
              lastLogin:        { type: 'TIMESTAMP', notnull: true, value: null },
              lastLoginAttempt: { type: 'TIMESTAMP', notnull: true, value: null },
              loginAttempts:    { type: 'INT', notnull: true, value: 0 },
              activationCode:   { type: 'VARCHAR(200)', notnull: true, value: 0 }
            }
    });
    this.set(model);
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
  save(){

	super.save();
	}

}


module.exports = Auth;
