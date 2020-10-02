"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var UserSchema = new _mongoose["default"].Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
UserSchema.pre('save', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(next) {
    var salt, hash;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _bcrypt["default"].genSalt(10);

          case 3:
            salt = _context.sent;
            _context.next = 6;
            return _bcrypt["default"].hash(this.password, salt);

          case 6:
            hash = _context.sent;
            this.password = hash;
            next();
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 11]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

UserSchema.methods.isValidPassword = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(password) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _bcrypt["default"].compare(password, this.password);

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            throw new Error(_context2.t0);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 6]]);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var UserModel = _mongoose["default"].model('user', UserSchema);

var _default = UserModel;
exports["default"] = _default;