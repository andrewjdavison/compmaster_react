var express = require('express');
var router = express.Router();

var table = rootRequire('common/tables');

router.get("/test", function (req, res) {
  res.send({result:"OK"});

});

module.exports = router;
