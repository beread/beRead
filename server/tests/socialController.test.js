const request = require('supertest');
const express = require ('express');
const socialRouter = require ('../routes/socialRoutes.js');

const app = express ();
app.use(express.json())
app.use('/api/social', socialRouter);

jest.mock('../models/userModel', () => ({
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findById: jest.fn().mockResolvedValue({
      populate: jest.fn().mockResolvedValue({
        followers: [{ username: 'follower1' }, { username: 'follower2' }],
      }),
    }),
  }));

  const User = require('../models/userModel');

  describe('Social Controller Routes', () => {
    describe('POST /api/users/followUser', () => {
      it('should follow a user successfully', async () => {
        User.findOne.mockResolvedValueOnce({ _id: 'user1Id', username: 'user1' }) // Mocking user
                       .mockResolvedValueOnce({ _id: 'user2Id', username: 'user2' }); // Mocking friend
  
        User.findByIdAndUpdate.mockResolvedValue({}); // Mocking the update operation
  
        const response = await request(app)
          .post('/api/users/followUser')
          .send({ username: 'user1', followUsername: 'user2' });
  
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
      });
    });
  
    describe('GET /api/users/getFollowedUsers', () => {
      it('should return followed users', async () => {
        // Assuming your logic for getting followed users is correct and returning an array of usernames
        const response = await request(app).get('/api/users/getFollowedUsers').send({ username: 'user1' });
  
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining(['user2']));
      });
    });
  
    describe('PUT /api/users/unfollowUser', () => {
      it('should unfollow a user successfully', async () => {
        // Similar setup as followUser, but with the logic for unfollowing
        User.findOne.mockResolvedValueOnce({ _id: 'user1Id', username: 'user1' }) // Mocking user
                       .mockResolvedValueOnce({ _id: 'user2Id', username: 'user2' }); // Mocking friend
  
        User.findOneAndUpdate.mockResolvedValue({}); // Mocking the update operation
  
        const response = await request(app)
          .put('/api/users/unfollowUser')
          .send({ username: 'user1', friendUsername: 'user2' });
  
        expect(response.statusCode).toBe(200);
      });
    });
  
    describe('GET /api/users/getFollowers', () => {
      it('should return a user\'s followers', async () => {
        const response = await request(app).get('/api/users/getFollowers').send({ userId: 'user1Id' });
  
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining(['follower1', 'follower2']));
      });
    });
  });
  