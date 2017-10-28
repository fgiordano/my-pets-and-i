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
  role       : { type: String, enum: ROLES, required: true },
  pet        : { type: Schema.Types.ObjectId, ref: 'Pet'},
  image     : { type: String, default: "https://www.menon.no/wp-content/uploads/person-placeholder.jpg" }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
