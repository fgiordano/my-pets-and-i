const express  = require('express');
const Pet      = require('../models/pet');
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

router.post('/pets', ensureLoggedIn('/login'), (req, res, next) => {

  const newPet = new Pet({
  name: req.body.name,
  type: req.body.type,
  breed: req.body.breed,
  weight: req.body.weight,
  age: req.body.age,
  aboutme: req.body.aboutme,
  owner: req.user._id

  });

  newPet.save( (err) => {
    if (err) {
      res.render('pets/new-pets', { Pet: newPet, types: TYPES });
    } else {
      res.redirect(`/pets/${newPet._id}`);
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

router.post('/:id', ensureLoggedIn('/login'), authorizePet, (req, res, next) => {
  const updates = {
    name: req.body.name,
    type: req.body.type,
    breed: req.body.breed,
    weight: req.body.weight,
    age: req.body.age,
    aboutme: req.body.aboutme,
    owner: req.user._id
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
    return res.redirect(`/pets/${Pet._id}`);
  });
});

router.get('/:id', checkOwnership, (req, res, next) => {
  Pet.findById(req.params.id, (err, Pet) => {
    if (err){ return next(err); }

    Pet.populate('_creator', (err, Pet) => {
      if (err){ return next(err); }
      return res.render('pets/show-pets', { Pet });
    });
  });
});



module.exports = router;
