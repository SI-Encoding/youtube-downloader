const request = require("supertest");
const server = require("../server.js");
const should = require('should');

describe("Unit tests", () => {
  it("should accept query url", (done) => {
      request(server).get('/download')
                .query({ url: 'https://www.youtube.com/watch?v=Oe421EPjeBE' })
                .expect(200)
                .end(function(err, res) {
                    done(err);
                });
  });
  it("should reject query url", (done) => {
      request(server).get('/download')
                .query({ url: 'https://www.youtube.com/watch?v=Oe421EPjeB' })
                .expect(200, function(err, res) {
                     res.text.should.equal('Please paste valid YouTube Link');
                    done(err);
                })
               
  });
})