"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var blogSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: [String],
    required: true
  },
  image: {
    type: String
  },
  comments: {
    type: [Object]
  },
  likes: {
    type: Number,
    "default": 0
  },
  shares: {
    type: Number
  }
});

var blogModel = _mongoose["default"].model("blogs", blogSchema);

var _default = blogModel;
exports["default"] = _default;