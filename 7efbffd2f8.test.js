import { request } from 'supertest';
import app from './index';
import { User } from './models/User';
import { hashSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

jest.mock('./models/User');

describe('POST /login', () => {
  const userData = {
    email: 'test@test.com',
    password: 'password'
  };

  const hashedPassword = hashSync(userData.password, 10);

  beforeEach(() => {
    User.findOne.mockClear();
  });

  test('should redirect to /register if user not found', async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/login')
      .send(userData);

    expect(response.headers.location).toBe('/register');
    expect(response.status).toBe(302);
  });

  test('should render login page if password is incorrect', async () => {
    User.findOne.mockResolvedValue({
      email: userData.email,
      password: hashedPassword
    });

    const response = await request(app)
      .post('/login')
      .send({
        ...userData,
        password: 'wrongPassword'
      });

    expect(response.text).toContain('Incorrect Password');
    expect(response.status).toBe(200);
  });

  test('should redirect to / if login is successful', async () => {
    User.findOne.mockResolvedValue({
      email: userData.email,
      password: hashedPassword,
      _id: '123'
    });

    const response = await request(app)
      .post('/login')
      .send(userData);

    const token = sign({
      _id: '123'
    }, "sdjasdbajsdbjasd");

    expect(response.headers['set-cookie']).toContain(`token=${token}; Path=/; HttpOnly; Expires`);
    expect(response.headers.location).toBe('/');
    expect(response.status).toBe(302);
  });
});
