const { default: mongoose } = require('mongoose');
const User = require('../server/models/userModel');
const request = require('supertest');

const connectDB = require('../server/config/db');
const dotenv = require('dotenv');
const { beforeEach, default: test } = require('node:test');

dotenv.config();
connectDB();

const server = 'http://localhost:3000';

const testUser = {
  username: 'ReservedForTesting',
  email: 'tester@test.com',
  password: 'testing123',
};

afterEach(async () => {
  await User.findOneAndDelete({ username: testUser.username });
});

afterAll(() => {
  mongoose.connection.close();
});

describe('/signup', () => {
  const URL = '/api/user/signup';

  it('responds with 200 status and application/json content type', () => {
    return request(server)
      .post(URL)
      .send(testUser)
      .expect('Content-Type', /application\/json/)
      .expect(200);
  });

  it('adds a new user', async () => {
    const res = await request(server).post(URL).send(testUser);
    expect(res.body.username).toEqual(testUser.username);
    expect(res.body.email).toEqual(testUser.email);
    expect(User.findOne({ username: testUser.username })).not.toEqual(null);
  });

  it('returns a 500 status with a log and a message when using an existing username', async () => {
    await request(server).post(URL).send(testUser);
    const res = await request(server).post(URL).send(testUser);
    expect(res.status).toEqual(500);
    expect(res.body.log).not.toEqual(undefined);
    expect(res.body.message).not.toEqual(undefined);
  });

  it('returns a 500 status with a log and a message when missing a username, email, or password', async () => {
    // missing username
    const res1 = await request(server).post(URL).send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res1.status).toEqual(500);
    expect(res1.body.log).not.toEqual(undefined);
    expect(res1.body.message).not.toEqual(undefined);
    // missing email
    const res2 = await request(server).post(URL).send({
      username: testUser.username,
      password: testUser.password,
    });
    expect(res2.status).toEqual(500);
    expect(res2.body.log).not.toEqual(undefined);
    expect(res2.body.message).not.toEqual(undefined);
    // missing password
    const res3 = await request(server).post(URL).send({
      username: testUser.username,
      email: testUser.email,
    });
    expect(res3.status).toEqual(500);
    expect(res3.body.log).not.toEqual(undefined);
    expect(res3.body.message).not.toEqual(undefined);
  });
});

describe('/sign in', () => {
  const URL = '/api/user';

  it('responds with 200 status and application/json content type', async () => {
    await request(server).post(URL+'/signup').send(testUser);

    return (
      request(server)
        .post(URL+'/signin')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect('Content-Type', /application\/json/)
        .expect(200)
    );
  });

  it('allows a user to log in', async () => {
    await request(server).post(URL+'/signup').send(testUser);

    const res = await request(server).post(URL+'/signin').send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.body.username).toEqual(testUser.username);
    expect(res.body.email).toEqual(testUser.email);
  });

  it('returns a 500 status with a message when given an invalid email or password', async () => {
    await request(server).post(URL+'/signup').send(testUser);

    const res1 = await request(server).post(URL+'/signin').send({
      email: 'invalidEmail',
      password: testUser.password,
    });
    expect(res1.status).toEqual(404);
    expect(res1.body).toEqual('Invalid email or password')

    const res2 = await request(server).post(URL+'/signin').send({
      email: testUser.email,
      password: 'invalidPassword',
    });
    expect(res2.status).toEqual(404);
    expect(res2.body).toEqual('Invalid email or password')
  });

  it('returns a 500 status with a message when missing an email or password', async () => {
    await request(server).post(URL+'/signup').send(testUser);

    const res1 = await request(server).post(URL+'/signin').send({ email: testUser.email });
    console.log(res1)
    expect(res1.status).toEqual(404);
    expect(res1.body).toEqual('Invalid email or password')

    const res2 = await request(server).post(URL+'/signin').send({ password: testUser.password });
    console.log(res2)
    expect(res2.status).toEqual(404);
    expect(res2.body).toEqual('Invalid email or password')
  });
});
