"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _database = _interopRequireDefault(require("../config/database.js"));

var _index = _interopRequireDefault(require("../../index.js"));

var _userController = _interopRequireDefault(require("../controllers/userController.js"));

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
var request = _chai["default"].request;
describe("api/user", function () {
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
  describe("POST/signup", function () {
    it("it should signUp a user", function (done) {
      request(_index["default"]).post('/api/user/signup').send({
        email: "sinanga@gmail.com",
        password: "Lambert"
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('token');
        done();
      });
    });
  });
  describe("POST/signup", function () {
    it("No user signUpwithout password", function (done) {
      request(_index["default"]).post('/api/user/signup').send({
        email: "sinanga@gmail.com",
        password: ""
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error', '"password" is not allowed to be empty');
        done();
      });
    });
  });
  describe("POST/signup", function () {
    it("No user signUpwithout valid email", function (done) {
      request(_index["default"]).post('/api/user/signup').send({
        email: "sinanga@gmail",
        password: "Lambert"
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error', '"email" must be a valid email');
        done();
      });
    });
  });
  describe("POST/signup", function () {
    it("No user signUp without  email", function (done) {
      request(_index["default"]).post('/api/user/signup').send({
        email: "",
        password: "Lambert"
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error', '"email" is not allowed to be empty');
        done();
      });
    });
  });
  describe("POST/signin", function () {
    it("it should  give a token when the right user user signIn", function (done) {
      request(_index["default"]).post('/api/user/signin').send({
        email: "siyubu@gmail.com",
        password: "solange"
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('token');
        done();
      });
    });
  });
  describe("POST/ wrong signin", function () {
    it("it should not give a token when the wrong user user signIn ", function (done) {
      request(_index["default"]).post('/api/user/signin').send({
        email: "sinanga@gmail.com",
        password: "kora akazi"
      }).end(function (err, res) {
        expect(res.status).to.equal(401);
        done();
      });
    });
  });
  describe("POST/ wrong signin email", function () {
    it("it should not give a token when the wrong user email entered ", function (done) {
      request(_index["default"]).post('/api/user/signin').send({
        email: "siyubu@gmail",
        password: "solange"
      }).end(function (err, res) {
        expect(res.status).to.equal(401);
        done();
      });
    });
  });
  describe("Controller / wrong signin email", function () {
    it("it should not give a token when the wrong user email entered ", function (done) {
      request(_index["default"]).post('/api/user/signin').send({
        email: "siyubu@gmail",
        password: "solange"
      }).end(function (err, res) {
        expect(res.status).to.equal(401);
        done();
      });
    });
  });
});