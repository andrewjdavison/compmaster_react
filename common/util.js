const atob = require ('atob');

module.exports = {

  getUser: function(req){
    if("authorization" in req.headers){
      var token = req.headers.authorization.split(' ')[1];
      var userPart = token.split('.')[1];
      return JSON.parse(atob(token.split('.')[1]));
    } else{
      return null;
    }
  },
  checkAuth: function(req, userId, perms){
    if("authorization" in req.headers){
      var token = req.headers.authorization.split(' ')[1];
      var userPart = token.split('.')[1];
      var user = JSON.parse(atob(token.split('.')[1]));

      console.log("Auth check for user id: "+user.id);

      if(user.id === userId){
        return true;
      }
      if(user.permissions | perms){
        return true;
      }
    }
    return null;

  }
};
