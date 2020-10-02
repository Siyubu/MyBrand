"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _passport2 = _interopRequireDefault(require("../passport.js"));

var _userController = _interopRequireDefault(require("../controllers/userController.js"));

var router = _express["default"].Router();

router.post('/signup', _userController["default"].signUp); //router.post('/secret',passport.authenticate('jwt', { session : false }),UserController.signUp);

router.post('/signin', _passport["default"].authenticate('local', {
  session: false
}), _userController["default"].signIn);
var _default = router;
exports["default"] = _default;