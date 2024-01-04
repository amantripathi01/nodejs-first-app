import request from 'supertest';
import User from './userModel';
import app from './index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('./userModel');

describe('POST /login', () => {
  let user;

  beforeEach(() => {
    user = {
      email: 'test@test.com',
      password: 'test123',
      _id: 'someUserId'
    };
  });

  test('should respond with a redirect to /register when user does not exist', async () => {
    User.findOne.mockReturnValue(null);

    const response = await request(app)
      .post('/login')
      .send({ email: user.email, password: user.password });

    expect(response.header.location).toBe('/register');
  });

  test('should respond with a redirect to login page when password is incorrect', async () => {
    User.findOne.mockReturnValue(user);
    bcrypt.compare.mockReturnValue(false);

    const response = await request(app)
      .post('/login')
      .send({ email: user.email, password: user.password });

    expect(response.header.location).toBe('/login');
  });

  test('should respond with a redirect to home page and set a cookie when login is successful', async () => {
    User.findOne.mockReturnValue(user);
    bcrypt.compare.mockReturnValue(true);
    jwt.sign.mockReturnValue('someToken');

    const response = await request(app)
      .post('/login')
      .send({ email: user.email, password: user.password });

    expect(response.header.location).toBe('/');
    expect(response.header['set-cookie']).toEqual(
      expect.arrayContaining([expect.stringContaining('token=someToken')])
    );
  });
});
