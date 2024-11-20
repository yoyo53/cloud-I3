const request = require('supertest');
const app = require('./server');

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('API of Y with Express.js and PostgeSQL');
  });
});
