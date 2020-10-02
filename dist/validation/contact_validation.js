"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var contactValidation = function contactValidation(body) {
  var ContactPostSchema = _joi["default"].object({
    names: _joi["default"].string().min(3).max(20).required(),
    subject: _joi["default"].string().min(3).max(30).required(),
    email: _joi["default"].string().email().required(),
    message: _joi["default"].string().min(10).required()
  });

  return ContactPostSchema.validate(body);
};

var _default = contactValidation;
exports["default"] = _default;