const mongoose = require('mongoose');
// const pw = process.env.MONGODB_PW;
// const url = `mongodb+srv://bookbeats_dev:${pw}@bookbeats.0wiktwi.mongodb.net/?retryWrites=true&w=majority)`;
// mongoose.connect(url, () => console.log('mongoDB connected'));

const spotifySchema = new mongoose.Schema({
  username: String,
  access_token: String,
  token_type: String,
  scope: String,
  expires_in: Number,
  refresh_token: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

const SpotifyModel = mongoose.model('spotify', spotifySchema);

module.exports = SpotifyModel;

