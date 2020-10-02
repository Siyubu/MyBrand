"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var userValidation = function userValidation(body) {
  var userValidationSchema = _joi["default"].object({
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().required()
  });

  return userValidationSchema.validate(body);
};

var _default = userValidation;
exports["default"] = _default;