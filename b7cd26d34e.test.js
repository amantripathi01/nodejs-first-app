import { jest } from '@jest/globals';
import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { isAuthenticated } from './index';
import User from './models/User';

jest.mock('jsonwebtoken');
jest.mock('./models/User');

const mockRequest = (cookies = {}) => ({
  cookies,
});

const mockResponse = () => {
  const res = {};
  res.redirect = jest.fn();
  return res;
};

const mockNext = jest.fn();

describe('isAuthenticated', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call next if token is valid', async () => {
    const req = mockRequest({ token: 'validToken' });
    const res = mockResponse();
    jwt.verify.mockReturnValueOnce({ _id: 'userId' });
    User.findById.mockResolvedValueOnce({ _id: 'userId' });

    await isAuthenticated(req, res, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith('validToken', 'sdjasdbajsdbjasd');
    expect(User.findById).toHaveBeenCalledWith('userId');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should redirect to login if token is not present', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await isAuthenticated(req, res, mockNext);

    expect(res.redirect).toHaveBeenCalledWith('/login');
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should redirect to login if token is invalid', async () => {
    const req = mockRequest({ token: 'invalidToken' });
    const res = mockResponse();
    jwt.verify.mockImplementationOnce(() => { throw new Error(); });

    await isAuthenticated(req, res, mockNext);

    expect(res.redirect).toHaveBeenCalledWith('/login');
    expect(mockNext).not.toHaveBeenCalled();
  });
});
