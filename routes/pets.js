const express  = require('express');
const Pet      = require('../models/pet');
const TYPES    = require('../models/pet-types');
const router   = express.Router();
const { ensureLoggedIn }  = require('connect-ensure-login');

router.get('/add-pets', (req, res) => {

  res.render('layouts/add-pets', { types: TYPES });
});

router.post('/', ensureLoggedIn('login'), (req, res, next) => {

  const newPet = new Pet({
  name: req.body.title,
  type: req.body.type,
  breed: req.body.breed,
  weight: req.body.weight,
  age: req.body.age,
  about-me: req.body.age,
  owner: req.user._id

  });

  newPet.save( (err) => {
    if (err) {
      res.render('add-pets', { pet: newPet, types: TYPES });
    } else {
      res.redirect(`/pets/${newPet._id}`);
    }
  });
});

router.get('/:id/edit-pets', ensureLoggedIn('/login'), (req, res, next) => {
  Pet.findById(req.params.id, (err, campaign) => {
    if (err)  { return next(err) }
    if (!pet) { return next(new Error("404")) }
    return res.render()
  })
})



module.exports = router;
