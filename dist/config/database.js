"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _contactModel = _interopRequireDefault(require("../models/contactModel.js"));

var _blogModel = _interopRequireDefault(require("../models/blogModel.js"));

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

_dotenv["default"].config();

_cloudinary["default"].config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETE
});

_mongoose["default"].connect(process.env.DEV_DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = _mongoose["default"].connection;
db.on('error', console.error.bind(console, 'Mongoose default connection error:'));
db.once('open', function () {
  console.log('Mongoose connected');
});
var _default = {
  contactModel: _contactModel["default"],
  blogModel: _blogModel["default"],
  userModel: _userModel["default"],
  cloudinary: _cloudinary["default"]
};
exports["default"] = _default;