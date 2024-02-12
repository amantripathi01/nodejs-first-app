// Test generated by RoostGPT for test ExpressJs using AI Type Open AI and AI Model gpt-4

const express = require("express");
const request = require("supertest");
const http = require("http");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello, World!");
});

let server;

beforeAll(done => {
  server = http.createServer(app);
  server.listen(done);
});

afterAll(done => {
  server.close(done);
});

describe("Server Test Suite", () => {
  test("should start the server successfully", async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
  });

  test("should return 404 for non-existent route", async () => {
    const response = await request(server).get("/non-existent-route");
    expect(response.status).toBe(404);
  });
});

