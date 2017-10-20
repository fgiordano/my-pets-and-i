const Pet = require('../models/pet.js');

function authorizePet(req, res, next){
  Pet.findById(req.params.id, (err, Pet) => {
    // If there's an error, forward it
    if (err)      { return next(err) }
    // If there is no campaign, return a 404
    if (!Pet){ return next(new Error('404')) }
    // If the campaign belongs to the user, next()
    if (Pet.belongsTo(req.user)){
  return next()
} else {
  return res.redirect(`/pets/${Pet._id}`)
}
  });
}

function checkOwnership(req, res, next){
  Pet.findById(req.params.id, (err, Pet) => {
    if (err){ return next(err) }
    if (!Pet){ return next(new Error('404')) }

    if (Pet.belongsTo(req.user)){
      res.locals.petIsCurrentUsers = true;
    } else {
      res.locals.petIsCurrentUsers = false;
    }
    return next()
  });
}

module.exports = {authorizePet, checkOwnership}
