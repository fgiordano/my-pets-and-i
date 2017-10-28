const express  = require('express');
const Pet      = require('../models/pet');
const User     = require('../models/user');
const TYPES    = require('../models/pet-types');
const router   = express.Router();
const { ensureLoggedIn }  = require('connect-ensure-login');
const {
  authorizePet,
  checkOwnership
} = require('../middleware/pet-authorization');

router.get('/new-pets', (req, res) => {

  res.render('pets/new-pets', { types: TYPES });
});

router.post('/', ensureLoggedIn('/login'), (req, res, next) => {

  const newPet = new Pet({
  name: req.body.name,
  type: req.body.type,
  breed: req.body.breed,
  weight: req.body.weight,
  age: req.body.age,
  aboutme: req.body.aboutme,
  owner: req.user._id,
  image: req.body.image

  });

  newPet.save( (err) => {
    if (err) {
      res.render('pets/new-pets', { Pet: newPet, types: TYPES });
    } else {
      res.redirect(`/users/profile`);
    }
  });
});


router.get('/:id/edit-pets', ensureLoggedIn('/login'), authorizePet, (req, res, next) => {
  Pet.findById(req.params.id, (err, Pet) => {
    if (err)  { return next(err) }
    if (!Pet) { return next(new Error("404")) }
    return res.render('pets/edit-pets', { Pet, types: TYPES })
  });
});

router.post('/:id/edit-pets', ensureLoggedIn('/login'), authorizePet, (req, res, next) => {
  const updates = {
    name: req.body.name,
    breed: req.body.breed,
    weight: req.body.weight,
    age: req.body.age,
    aboutme: req.body.aboutme,
    image: req.body.image
  };

  Pet.findByIdAndUpdate(req.params.id, updates, (err, Pet) => {
    if (err) {
      return res.render('pets/edit-pets', {
        Pet,
        errors: Pet.erros
      });
    }
    if (!Pet) {
      return next(new Error('404'));
    }
    return res.redirect(`/users/profile`);
  });
});

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Pet.findByIdAndRemove(id, (err, Pet) => {
    if (err){ return next(err); }
    return res.redirect(`/users/profile`);
  });

});

router.get('/:id', checkOwnership, (req, res, next) => {
  Pet.findById(req.params.id, (err, Pet) => {
    if (err){ return next(err); }

    Pet.populate('owner', (err, creator) => {
      if (err){ return next(err); }
      return res.render('pets/show-pets', { Pet, creator });
    });
  });
});



module.exports = router;
