var express = require('express');
var router = express.Router();
var User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;


/* GET users listing. */

// router.get('/profile', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/:id/edit-user', (req, res, next) => {
  User.findById(req.params.id, (err, User) => {
    if (err){ return next(err); }
    if (!User) { return next(new Error("404")) }
      return res.render('users/edit-user', { User })
  });
});

router.get('/:id/show-petcarer', (req, res, next) => {
  User.findById(req.params.id, (err, User) => {
    if (err){ return next(err); }
    if (!User) { return next(new Error("404")) }
      return res.render('users/show-petcarer', { User })
  });
});


module.exports = router;
