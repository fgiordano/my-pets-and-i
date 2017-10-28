var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
      let User = (typeof(req.user)=='undefined')?"":req.user;
      return res.render('index', {User});
});

module.exports = router;
