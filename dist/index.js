"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("babel-polyfill");

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("./routes/index.js"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _swagger = _interopRequireDefault(require("../swagger.json"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var port1 = process.env.port || 5000;
var app = (0, _express["default"])();
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.use(_express["default"].json());
app.use("/api", _index["default"]);
app.use("/api-doc", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"]));
app.listen(port1, function () {
  return console.log("listeeeening on port ".concat(port1, " ..."));
});
var _default = app;
exports["default"] = _default;