const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const User     = require('./user');


const ReviewSchema = new Schema({
  owner      : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content    : { type: String, required: true },
  rating     : { type: Number, required: true },
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
