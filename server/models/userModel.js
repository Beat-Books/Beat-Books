// User Model
const mongoose = require('mongoose');
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

// SCHEMA SETUP
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  favoriteBooks: [
    {
      bookTitle: String,
      bookAuthor: String,
    },
  ],
  favoriteSongs: [
    {
      songName: String,
      songArtist: String,
    },
  ],
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  const user = this;
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err)
      next({
        log: 'generating salt error',
        message: { err: err },
      });
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err)
        next({
          log: 'hashing password error',
          message: { err: err },
        });
      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  const user = this;
  bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
