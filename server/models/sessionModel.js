const mongoose = require('mongoose');
const pw = process.env.MONGODB_PW;
const url = `mongodb+srv://bookbeats_dev:${pw}@bookbeats.0wiktwi.mongodb.net/?retryWrites=true&w=majority)`;
mongoose.connect(url, () => console.log('mongoDB connected'));

const sessionSchema = new mongoose.Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 7200, default: Date.now },
});

module.exports = mongoose.model('Session', sessionSchema);
