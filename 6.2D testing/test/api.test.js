const expect = require("chai").expect;
const request = require("request");

const baseUrl = "http://localhost:3000";

describe("SIT725 Project - API Tests", function () {
  it("should return status 200 for base URL", function (done) {
    request(baseUrl, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it("should return an array of data from /api/data", function (done) {
    request.get(`${baseUrl}/api/data`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      const data = JSON.parse(body);
      expect(data).to.be.an("array");
      done();
    });
  });

  it("should return non-empty data from /api/data", function (done) {
    request.get(`${baseUrl}/api/data`, function (error, response, body) {
      const data = JSON.parse(body);
      expect(data.length).to.be.greaterThan(0);
      done();
    });
  });

  it("should return proper object structure from /api/data", function (done) {
    request.get(`${baseUrl}/api/data`, function (error, response, body) {
      const data = JSON.parse(body);
      expect(data[0]).to.be.an("object");
      expect(data[0]).to.have.property("title");
      expect(data[0]).to.have.property("description");
      done();
    });
  });

  it("should return 404 for an invalid route", function (done) {
    request.get(`${baseUrl}/invalidroute`, function (error, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});
