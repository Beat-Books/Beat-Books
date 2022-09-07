const request = require('supertest');
const app = require('../server/main');
const route = require('../server/routes/music');

describe('api/music', () => {

  describe('GET', () => {
    test('responds with status 200', async () => {
      const res = await request(app)
        .get('/api/music/')
        .expect(200)
    });
  });
});