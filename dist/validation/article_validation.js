"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var blogValidation = function blogValidation(body) {
  var blogPostSchema = _joi["default"].object({
    title: _joi["default"].string().min(3).max(30).required(),
    body: _joi["default"].string().min(10)
  });

  return blogPostSchema.validate(body);
};

var _default = blogValidation;
exports["default"] = _default;