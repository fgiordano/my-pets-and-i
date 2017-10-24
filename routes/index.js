var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(req.user._id);
  User.findById(req.user._id, (err, User) => {
    if (err){ return next(err); }
    if (!User) { return next(new Error("404")) }
      return res.render('index', { User })
  });
});

module.exports = router;
