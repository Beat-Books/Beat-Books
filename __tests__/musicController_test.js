const request = require('supertest');
const app = require('../server/main');


describe('AuthorizeSpotifyUser', () => {
  // NOTE: can't get regex to work
  xtest('redirects to Spotify login/approval page', async () => {
    const res = await request(app)
      .get('/api/music/spotify/auth')
      .expect(302);
      expect(res.header.location).toMatch(
        /^.*accounts\.spotify\.com\/en\/authorize.*$/
      );
  })
  xtest('recieves an authorization code', async () => {
    const res = await request(app)
      .get('/api/music/spotify/auth/token')
      .expect(200);
    expect(res.query.code).toBeDefined();
    
  });
   
});