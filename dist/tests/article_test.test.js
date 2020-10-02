"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index.js"));

var _database = _interopRequireDefault(require("../config/database.js"));

var _path = _interopRequireDefault(require("path"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
var request = _chai["default"].request;
describe("api/article", function () {
  beforeEach(function (done) {
    var user = new _database["default"].userModel({
      email: "siyubu@gmail.com",
      password: "solange"
    });
    user.save(function (err) {
      done();
    });
  });
  afterEach(function (done) {
    _database["default"].userModel.collection.drop();

    done();
  });
  describe("POST/ title and body  validation and are mendatory", function () {
    it("User should post new Article if he provide proper token and articles'title and body are validated", function (done) {
      request(_index["default"]).post('/api/user/signin').send({
        email: "siyubu@gmail.com",
        password: "solange"
      }).end(function (err, res) {
        request(_index["default"]).post("/api/article/create").set({
          'Authorization': res.body.token
        }).send({
          title: "It is only the matter of focus",
          body: "To start with Node.js integration testing, we will use Mocha and ChaiNPM packages.",
          image: "this needs image url 1"
        }).end(function (err, response) {
          expect(response).to.have.status(200);
          done();
        });
      });
    });
  });
  describe("POST/ without valid token", function () {
    it("User should post new Article if he provide proper token and articles'title and body and image url", function (done) {
      var token = _jsonwebtoken["default"].sign({
        iss: 'CodeWorkr',
        sub: '5f6df915167855296c71aef8',
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
      }, 'secret_token');

      request(_index["default"]).post("/api/article/create").set({
        'Authorization': token
      }).set('Content-Type', 'application/x-www-form-urlencoded').field('title', "It is only the matter of focus").field('body', "To start with Node.js integration testing, we will use Mocha and ChaiNPM packages").attach('image', _path["default"].join(__dirname, 'assets/girl.JPG')).end(function (err, response) {
        expect(response).to.have.status(401);
        done();
      });
    });
  });
  describe("POST/not allowed to see article with no token", function () {
    it("User should not see posted articles if he doesn't provide token", function (done) {
      request(_index["default"]).get("/api/articles/").end(function (err, res) {
        expect(res).to.have.status(401);
        done();
      });
    });
  });
  describe("POST/ no post without title", function () {
    it("User should not post if he doesn't fill out title ", function (done) {
      request(_index["default"]).post('/api/user/signin').send({
        email: "siyubu@gmail.com",
        password: "solange"
      }).end(function (err, res) {
        request(_index["default"]).post("/api/article/create").set({
          'Authorization': res.body.token
        }).send({
          title: "",
          body: "To start with Node.js integration testing, we will use Mocha and ChaiNPM packages.",
          image: "this needs image url 1"
        }).end(function (err, response) {
          expect(response).to.have.status(200);
          expect(response.body).to.have.property("error", '"title" is not allowed to be empty');
          done();
        });
      });
    });
  });
  describe("POST/ no post without body", function () {
    it("User should not post without fill out body", function (done) {
      request(_index["default"]).post('/api/user/signin').send({
        email: "siyubu@gmail.com",
        password: "solange"
      }).end(function (err, res) {
        request(_index["default"]).post("/api/article/create").set({
          'Authorization': res.body.token
        }).send({
          title: "It is only the matter of focus",
          body: "",
          image: "this needs image url 1"
        }).end(function (err, response) {
          expect(response).to.have.status(200);
          expect(response.body).to.have.property("error", '"body" is not allowed to be empty');
          done();
        });
      });
    });
  });
  describe("POST/ no post without Image", function () {
    it("User should not post without fill out title image", function (done) {
      request(_index["default"]).post('/api/user/signin').send({
        email: "siyubu@gmail.com",
        password: "solange"
      }).end(function (err, res) {
        request(_index["default"]).post("/api/article/create").set({
          'Authorization': res.body.token
        }).send({
          title: "It is only the matter of focus",
          body: "User should not post if he doesn't fill out title and/or article",
          image: ""
        }).end(function (err, response) {
          expect(response).to.have.status(200);
          expect(response.body).to.have.property("error", '"image" is not allowed');
          done();
        });
      });
    });
  });
  describe("POST/ no post with invalid title", function () {
    it("User should not post if he doesn't fill out valid title ", function (done) {
      request(_index["default"]).post('/api/user/signin').send({
        email: "siyubu@gmail.com",
        password: "solange"
      }).end(function (err, res) {
        request(_index["default"]).post("/api/article/create").set({
          'Authorization': res.body.token
        }).send({
          title: "A",
          body: "To start with Node.js integration testing, we will use Mocha and ChaiNPM packages.",
          image: "this needs image url 1"
        }).end(function (err, response) {
          expect(response).to.have.status(200);
          expect(response.body).to.have.property("error", '"title" length must be at least 3 characters long');
          done();
        });
      });
    });
  });
  describe("POST/ no post without invalid body", function () {
    it("User should not post without fill out valid body", function (done) {
      request(_index["default"]).post('/api/user/signin').send({
        email: "siyubu@gmail.com",
        password: "solange"
      }).end(function (err, res) {
        request(_index["default"]).post("/api/article/create").set({
          'Authorization': res.body.token
        }).send({
          title: "It is only the matter of focus",
          body: "ab",
          image: "this needs image url 1"
        }).end(function (err, response) {
          expect(response).to.have.status(200);
          expect(response.body).to.have.property("error", '"body" length must be at least 10 characters long');
          done();
        });
      });
    });
  });
  describe("Get/ article", function () {
    it("User should read article if provide valid token", function (done) {
      request(_index["default"]).post('/api/user/signin').send({
        email: "siyubu@gmail.com",
        password: "solange"
      }).end(function (err, res) {
        request(_index["default"]).get("/api/articles/").set({
          'Authorization': res.body.token
        }).end(function (err, response) {
          expect(response).to.have.status(200);
          done();
        });
      });
    });
  });
  describe("Get/ no article without  token", function () {
    it("User shouldn't read articles if no token", function (done) {
      request(_index["default"]).get("/api/articles/").end(function (err, response) {
        expect(response).to.have.status(401);
        expect(response.body).to.be.a('object');
        done();
      });
    });
  });
  describe("PACTH/ no update without valid id", function () {
    it("should fail to update the blog", function (done) {
      request(_index["default"]).patch("/api/article/".concat('5f6df915167855296c71aef8')).end(function (err, resp) {
        expect(resp).to.have.status(401);
        expect(resp.body).to.be.a('object');
        done();
      });
    });
  });
  describe("DELETE/ no deletion without valid id", function () {
    it("should fail to update the blog", function (done) {
      request(_index["default"])["delete"]("/api/article/".concat('5f6df915167855296c71aef8')).end(function (err, resp) {
        expect(resp).to.have.status(401);
        expect(resp.body).to.be.a('object');
        done();
      });
    });
  });
  describe("COMMENT/ no comment without valid id", function () {
    it("should fail to post a comment on the blog", function (done) {
      request(_index["default"]).post("/api/article/comment/".concat('5f6df915167855296c71aef8')).end(function (err, resp) {
        expect(resp).to.have.status(401);
        expect(resp.body).to.be.a('object');
        done();
      });
    });
  });
});