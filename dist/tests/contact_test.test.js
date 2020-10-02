"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _database = _interopRequireDefault(require("../config/database.js"));

var _index = _interopRequireDefault(require("../../index.js"));

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
var request = _chai["default"].request;
describe("api/query", function () {
  beforeEach(function (done) {
    var query = new _database["default"].contactModel({
      names: "Andela Andelian",
      subject: "This week we will be finishing",
      email: "andela@gmail.com",
      message: " It was hard and great. the good news is your 'I am wondering if we will get a break ooh!' is answered by yes"
    });
    query.save(function (err) {
      done();
    });
  });
  afterEach(function (done) {
    _database["default"].contactModel.collection.drop();

    done();
  });
  describe("POST/create", function () {
    it("should post a query", function (done) {
      request(_index["default"]).post('/api/query/create').send({
        names: "test1Contact",
        subject: "Testing is harder",
        email: "contact@gmail.com",
        message: "I am wondering if we will get a break ooh!"
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('names');
        expect(res.body).to.have.property('subject');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('_id');
        expect(res.body.names).to.equal('test1Contact');
        expect(res.body.subject).to.equal('Testing is harder');
        expect(res.body.email).to.equal('contact@gmail.com');
        expect(res.body.message).to.equal('I am wondering if we will get a break ooh!');
        done();
      });
    });
  });
  describe("POST/create", function () {
    it("should not post a query with empty name", function (done) {
      request(_index["default"]).post('/api/query/create').send({
        names: "",
        subject: "Testing is harder",
        email: "contact@gmail.com",
        message: "I am wondering if we will get a break ooh!"
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done();
      });
    });
  });
  describe("POST/create", function () {
    it("should not post a query with invalid name", function (done) {
      request(_index["default"]).post('/api/query/create').send({
        names: "A",
        subject: "Testing is harder",
        email: "contact@gmail.com",
        message: "I am wondering if we will get a break ooh!"
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done();
      });
    });
  });
  describe("POST/create", function () {
    it("should not post a query with empty subject", function (done) {
      request(_index["default"]).post('/api/query/create').send({
        names: "test1Contact",
        subject: "",
        email: "contact@gmail.com",
        message: "I am wondering if we will get a break ooh!"
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done();
      });
    });
  });
  describe("POST/create", function () {
    it("should not post a query with invalid subject", function (done) {
      request(_index["default"]).post('/api/query/create').send({
        names: "test1Contact",
        subject: "T",
        email: "contact@gmail.com",
        message: "I am wondering if we will get a break ooh!"
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done();
      });
    });
  });
  describe("POST/create", function () {
    it("should not post a query with empty email", function (done) {
      request(_index["default"]).post('/api/query/create').send({
        names: "test1Contact",
        subject: "Testing is harder",
        email: "",
        message: "I am wondering if we will get a break ooh!"
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done();
      });
    });
  });
  describe("POST/create", function () {
    it("should not post a query with invalid email", function (done) {
      request(_index["default"]).post('/api/query/create').send({
        names: "test1Contact",
        subject: "Testing is harder",
        email: "contact@gmail",
        message: "I am wondering if we will get a break ooh!"
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done();
      });
    });
  });
  describe("POST/create", function () {
    it("should not post a query with empty message", function (done) {
      request(_index["default"]).post('/api/query/create').send({
        names: "test1Contact",
        subject: "Testing is harder",
        email: "contact@gmail.com",
        message: ""
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done();
      });
    });
  });
  describe("POST/create", function () {
    it("should not post a query with invalid message", function (done) {
      request(_index["default"]).post('/api/query/create').send({
        names: "test1Contact",
        subject: "",
        email: "contact@gmail.com",
        message: "I"
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done();
      });
    });
  });
  describe("GET /", function () {
    it("It should return all queries", function (done) {
      request(_index["default"]).get('/api/queries/').end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('Array');
        expect(res.body[0]).to.have.property('_id');
        expect(res.body[0]).to.have.property('names');
        expect(res.body[0]).to.have.property('subject');
        expect(res.body[0]).to.have.property('email');
        expect(res.body[0]).to.have.property('message');
        expect(res.body[0].names).to.equal('Andela Andelian');
        expect(res.body[0].email).to.equal('andela@gmail.com');
        done();
      });
    });
  });
  describe("DELETE/:id", function () {
    it("it should delete a query", function (done) {
      request(_index["default"]).get('/api/queries').end(function (err, res) {
        request(_index["default"])["delete"]("/api/query/".concat(res.body[0]._id)).end(function (err, response) {
          expect(response.status).to.equal(204);
          done();
        });
      });
    });
  });
});