const app = require('../server/main');
const request = require('supertest');

describe('express server', () => {

  test('is listening', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => done());
  })
})
