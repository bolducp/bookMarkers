'use strict';

var userSchema = new mongoose.Schema({
  uid: String,
  username: {type: String, required: true},
  email: {type: String, required: true},
  location: {type: Number, min: 501, max: 99999},
  blurb: String,
  favoriteBooks: [String],
  dislikedBooks: [String],
  receivedSuggestions: [String]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
