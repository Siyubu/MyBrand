"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _database = _interopRequireDefault(require("../config/database.js"));

var _contact_validation = _interopRequireDefault(require("../validation/contact_validation.js"));

var ContactController = /*#__PURE__*/function () {
  function ContactController() {
    (0, _classCallCheck2["default"])(this, ContactController);
  }

  (0, _createClass2["default"])(ContactController, null, [{
    key: "createContact",
    value: function () {
      var _createContact = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var auth, created;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                auth = (0, _contact_validation["default"])(req.body);

                if (!auth.error) {
                  _context.next = 5;
                  break;
                }

                res.send({
                  error: auth.error.details[0].message
                });
                _context.next = 15;
                break;

              case 5:
                _context.prev = 5;
                created = new _database["default"].contactModel({
                  names: auth.value.names,
                  subject: auth.value.subject,
                  email: auth.value.email,
                  message: auth.value.message
                });
                _context.next = 9;
                return created.save();

              case 9:
                res.status(200).json(created);
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](5);
                res.status(500).json(_context.t0);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 12]]);
      }));

      function createContact(_x, _x2) {
        return _createContact.apply(this, arguments);
      }

      return createContact;
    }()
  }, {
    key: "getContacts",
    value: function () {
      var _getContacts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var contacts;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _database["default"].contactModel.find({});

              case 3:
                contacts = _context2.sent;
                return _context2.abrupt("return", res.status(200).json(contacts));

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json(_context2.t0));

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      function getContacts(_x3, _x4) {
        return _getContacts.apply(this, arguments);
      }

      return getContacts;
    }()
  }, {
    key: "deleteContact",
    value: function () {
      var _deleteContact = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _database["default"].contactModel.deleteOne({
                  _id: req.params.id
                });

              case 3:
                return _context3.abrupt("return", res.status(204).send());

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(404).json(_context3.t0));

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 6]]);
      }));

      function deleteContact(_x5, _x6) {
        return _deleteContact.apply(this, arguments);
      }

      return deleteContact;
    }()
  }]);
  return ContactController;
}();

exports["default"] = ContactController;