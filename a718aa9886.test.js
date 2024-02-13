// ********RoostGPT********
// Test generated by RoostGPT for test aman12Feb using AI Type Open AI and AI Model gpt-4



// ********RoostGPT********
import express from "express";

const app = express();
let server;

describe("Server", () => {
  beforeAll((done) => {
    server = app.listen(5000, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  test("should start the server without errors", (done) => {
    const req = http.get("http://localhost:5000", (res) => {
      expect(res.statusCode).toBe(200);
      done();
    });

    req.on("error", (err) => {
      console.log("Error : " + err.message);
    });
  });

  test("should return error when the server is not running", (done) => {
    const req = http.get("http://localhost:6000", (res) => {});

    req.on("error", (err) => {
      expect(err).toBeTruthy();
      done();
    });
  });
});
