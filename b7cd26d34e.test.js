import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { isAuthenticated } from "./index";
import User from "./models/User";

jest.mock("jsonwebtoken");
jest.mock("./models/User");

describe("Test isAuthenticated middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      cookies: {
        token: "test_token",
      },
      user: null
    };
    res = {
      redirect: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call next function if token is valid", async () => {
    jwt.verify.mockReturnValueOnce({ _id: "test_id" });
    User.findById.mockResolvedValueOnce({ _id: "test_id" });

    await isAuthenticated(req, res, next);

    expect(req.user).toEqual({ _id: "test_id" });
    expect(next).toHaveBeenCalled();
  });

  it("should redirect to login if token is invalid", async () => {
    jwt.verify.mockImplementationOnce(() => {
      throw new Error("invalid token");
    });

    await isAuthenticated(req, res, next);

    expect(res.redirect).toHaveBeenCalledWith("/login");
  });

  it("should redirect to login if token is not provided", async () => {
    req.cookies = {};

    await isAuthenticated(req, res, next);

    expect(res.redirect).toHaveBeenCalledWith("/login");
  });
});
