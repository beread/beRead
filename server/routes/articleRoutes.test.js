const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('GET /api/article/articleOfTheDay', () => {
  it('responds with json', async () => {
    const res = await request(app)
      .get('/api/article/articleOfTheDay')
      .expect('Content-Type', /json/)
      .expect(200);

    // Add more assertions here as needed
  });

});

