import express from "express";
import request from "supertest";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from './userModel'; // assuming you have a user model in same directory.
import app from './index'; // import the express app from index.js

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe("POST /register", () => {

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    test("It should create a new user when a unique email is provided", async () => {
        const mockUser = { name: "test", email: "test@test.com", password: "test" };
        bcrypt.hash.mockResolvedValue("hashedPassword");
        jwt.sign.mockReturnValue("testToken");

        const response = await request(app)
            .post("/register")
            .send(mockUser);

        expect(response.status).toBe(302);
        expect(response.headers.location).toBe("/");
        expect(response.headers['set-cookie']).toEqual(expect.arrayContaining([expect.stringContaining("token=testToken")]));
    });

    test("It should redirect to /login when email already exists", async () => {
        const mockUser = { name: "test", email: "test@test.com", password: "test" };
        bcrypt.hash.mockResolvedValue("hashedPassword");
        jwt.sign.mockReturnValue("testToken");

        await request(app)
            .post("/register")
            .send(mockUser);

        const response = await request(app)
            .post("/register")
            .send(mockUser);

        expect(response.status).toBe(302);
        expect(response.headers.location).toBe("/login");
    });
});
