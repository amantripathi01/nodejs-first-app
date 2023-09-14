import express from "express";
import request from "supertest";

describe("Server", () => {
  let server;
  let httpServer;

  beforeAll(() => {
    const app = express();
    httpServer = app.listen(5000, () => {
      console.log("Server is working");
    });
    server = app;
  });

  test("should be listening at port 5000", async () => {
    const response = await request(server).get("/");
    expect(response.status).toEqual(200);
  });

  test("should return error for invalid endpoint", async () => {
    const response = await request(server).get("/invalid-endpoint");
    expect(response.status).toEqual(404);
  });

  afterAll(() => {
    httpServer.close();
  });
});
