'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  uid: String,
  username: {type: String, required: true},
  email: {type: String, required: true},
  imageUrl: {type: String, default: "http://images.clipartpanda.com/silliness-clipart-Photo_Album_Clip_Art.gif"},
  location: {type: Number, min: 501, max: 99999},
  blurb: String,
  favoriteBooks: [String],
  dislikedBooks: [String],
  receivedSuggestions: [String]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
