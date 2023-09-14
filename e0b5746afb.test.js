// Test generated by RoostGPT for test ExpressJs using AI Type Open AI and AI Model gpt-4

import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import request from 'supertest';
import app from './index';

describe("POST /register", () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  test("It should respond with a redirect on successful registration", async () => {
    const newUser = {
      name: 'test',
      email: 'test@test.com',
      password: 'password'
    };
    const response = await request(app).post("/register").send(newUser);
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe("/");
  });

  test("It should respond with a redirect to login when user already exists", async () => {
    const existingUser = {
      name: 'test',
      email: 'test@test.com',
      password: 'password'
    };
    await request(app).post("/register").send(existingUser);
    const response = await request(app).post("/register").send(existingUser);
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe("/login");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
