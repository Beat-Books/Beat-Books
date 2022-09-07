const app = require('../server/main');
const request = require('supertest');

describe('express server', () => {

  test('is listening', async () => {
    const res = await request(app)
      .get('/')
      .expect(200)
  })
})
