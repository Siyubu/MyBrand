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

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user_validation = _interopRequireDefault(require("../validation/user_validation.js"));

var signToken = function signToken(user) {
  return _jsonwebtoken["default"].sign({
    iss: 'CodeWorkr',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'secret_token');
};

var UserController = /*#__PURE__*/function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, null, [{
    key: "signUp",
    value: function () {
      var _signUp = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var auth, _auth$value, email, password, foundUser, newUser, token;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                auth = (0, _user_validation["default"])(req.body);

                if (auth.error) {
                  res.send({
                    error: auth.error.details[0].message
                  });
                }

                _auth$value = auth.value, email = _auth$value.email, password = _auth$value.password;
                _context.next = 5;
                return _database["default"].userModel.findOne({
                  email: email
                });

              case 5:
                foundUser = _context.sent;

                if (!foundUser) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", res.status(403).json({
                  error: 'Email is already in use'
                }));

              case 10:
                _context.prev = 10;
                newUser = new _database["default"].userModel({
                  email: email,
                  password: password
                });
                _context.next = 14;
                return newUser.save();

              case 14:
                token = signToken(newUser);
                res.status(200).json({
                  token: token
                });
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](10);
                res.status(500).json(_context.t0);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[10, 18]]);
      }));

      function signUp(_x, _x2, _x3) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }, {
    key: "signIn",
    value: function () {
      var _signIn = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
        var user, token;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                user = _database["default"].userModel;
                token = signToken(req.user);
                res.status(200).json({
                  token: token
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function signIn(_x4, _x5, _x6) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }()
  }]);
  return UserController;
}(); //     passport.use('signup', new localStrategy({
//         usernameField : 'email',
//         passwordField : 'password'
//       }, async (email, password, done) => {
//           try {
//             const user = await db.userModel.create({ email, password });
//             return done(null, user);
//           } catch (error) {
//             done(error);
//           }
//       }));
//       //Create a passport middleware to handle User login
//     passport.use('login', new localStrategy({
//     usernameField : 'email',
//     passwordField : 'password'
//   }, async (email, password, done) => {
//     try {
//       const user = await db.userModel.findOne({ email });
//       if( !user ){
//         return done(null, false, { message : 'User not found'});
//       }
//       const validate = await user.isValidPassword(password);
//       if( !validate ){
//         return done(null, false, { message : 'Wrong Password'});
//       }
//       return done(null, user, { message : 'Logged in Successfully'});
//     } catch (error) {
//       return done(error);
//     }
//   }));
// //This verifies that the token sent by the user is valid
// passport.use(new JWTstrategy({
//   secretOrKey : 'top_secret',
//   jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
// }, async (token, done) => {
//   try {
//     return done(null, token.user);
//   } catch (error) {
//     done(error);
//   }
// }))


exports["default"] = UserController;