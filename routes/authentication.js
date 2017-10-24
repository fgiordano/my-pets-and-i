const express = require('express');
const router  = express.Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login');
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login'
}));

// 
// app.post('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     // Redirect if it fails
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       // Redirect if it succeeds
//       return res.redirect('/users/' + user.username);
//     });
//   })(req, res, next);
// });

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup');
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup'
}));

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;
