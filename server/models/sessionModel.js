const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 7200, default: Date.now },
});

module.exports = mongoose.model('Session', sessionSchema);
