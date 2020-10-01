"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _database = _interopRequireDefault(require("./config/database.js"));

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = _interopRequireDefault(require("passport-local"));

var _passportJwt = _interopRequireDefault(require("passport-jwt"));

var localStrategy = _passportLocal["default"].Strategy;
var JWTstrategy = _passportJwt["default"].Strategy;
var ExtractJWT = _passportJwt["default"].ExtractJwt; // JSON WEB TOKENS STRATEGY

_passport["default"].use(new JWTstrategy({
  jwtFromRequest: ExtractJWT.fromHeader('authorization'),
  secretOrKey: 'secret_token'
}, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload, done) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // Find the user specified in token
            console.log(payload.sub);
            _context.next = 4;
            return _database["default"].userModel.findById(payload.sub);

          case 4:
            user = _context.sent;

            if (user) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", done(null, false));

          case 7:
            // Otherwise, return the user
            done(null, user);
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            done(_context.t0, false);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}())); // LOCAL STRATEGY


_passport["default"].use(new localStrategy({
  usernameField: 'email'
}, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email, password, done) {
    var user, isMatch;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _database["default"].userModel.findOne({
              email: email
            });

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", done(null, false));

          case 6:
            _context2.next = 8;
            return user.isValidPassword(password);

          case 8:
            isMatch = _context2.sent;

            if (isMatch) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", done(null, false));

          case 11:
            // Otherwise, return the user
            done(null, user);
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            done(_context2.t0, false);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 14]]);
  }));

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}()));

var _default = _passport["default"];
exports["default"] = _default;