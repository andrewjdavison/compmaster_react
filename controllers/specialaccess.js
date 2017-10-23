'use strict';
var TableController = rootRequire('controllers/table');
var Specialaccess = rootRequire('models/specialaccess');

class SpecialaccessController extends TableController {
  constructor(){
    var specialaccess = new Specialaccess();
    specialaccess.pluralName = "specialaccesses";
    super(specialaccess);
  }

  findMiddleware(req, interimResult){
    var result = interimResult[0];

    // No record for this user in this competition
    if(typeof result == 'undefined'){
      return [{id:0, granted:0, expires: '2002-02-02 00:00:00'}];
    }

    // Check that the right's aren't expired...

    var now = new Date();
    var expires = new Date(result.expires);

    if(now > expires){
      return [{id:result.id, granted:0, expires: result.expires}];
    }

    return [{id:result.id, granted: 1, expires: result.expires}];
  }

}


module.exports = SpecialaccessController;
