const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const RESIDENCY = require('./residency-types');
const ROLES     = require('./roles-types');
const PARKING   = require('./parking-types');

const Pet       = mongoose.model.Pet;

const userSchema = new Schema({
  email      : { type: String, required: true },
  username   : { type: String, required: true },
  password   : { type: String, required: true },
  aboutme    : { type: String, required: true },
  address    : { type: String, required: true },
  parking    : { type: String, enum: PARKING},
  residence  : { type: String, enum: RESIDENCY},
  role       : { type: String, enum: ROLES, required: true },
  pet        : { type: Schema.Types.ObjectId, ref: 'Pet'},
  imgUrl     : { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250" }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
