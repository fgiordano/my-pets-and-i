var express = require('express');
var router = express.Router();
var User = require('../models/user');
const Pet = require('../models/pet');
const ObjectId = require('mongoose').Types.ObjectId;
const ROLES     = require('../models/roles-types');
const { ensureLoggedIn }  = require('connect-ensure-login');

/* GET users listing. */

// router.get('/profile', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/:id/edit-user', ensureLoggedIn('/login'), (req, res, next) => {
  User.findById(req.params.id, (err, User) => {
    if (err){ return next(err); }
    if (!User) { return next(new Error("404")) }
      return res.render('users/edit-user', { User, role: ROLES })
  });
});

router.post('/:id', ensureLoggedIn('/login'), (req, res, next) => {
  const updates = {
    username: req.body.username,
    email: req.body.email,
    aboutme: req.body.aboutme,
    role: req.body.role
  };

  User.findByIdAndUpdate(req.params.id, updates, (err, User) => {
    if (err) {
      return res.render('users/edit-user', {
        User,
        errors: user.errors
      });
    }
    if (!User) {
      return next(new Error('404'));
    }
    return res.redirect(`/users/${User._id}/show-petcarer`);
  });
});

router.get('/:id/show-petcarer', (req, res, next) => {
   let User = req.user;
   Pet.find({'owner':req.user._id}, (err, pets) => {
     if (err){ return next(err); }
     if (!req.user) { return next(new Error("404")) }
       return res.render('users/show-petcarer', { User, pets })
  });

});

module.exports = router;
