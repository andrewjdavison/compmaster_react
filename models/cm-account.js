var db = rootRequire('common/db');

var cm-account = {
  id: null,
  userName: null,
  email: null,

  load: function (id) {
    var queryStr = "SELECT id, userName, email from user where id=?";

    db.query(queryStr, [id])
    .then(function(result) {
      this.userName = result.userName;
      this.email = result.email;
      return true;
    })
    .catch(function(err){
      return err;
    });

  }
};


