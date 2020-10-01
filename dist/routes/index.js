"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _route = _interopRequireDefault(require("./route.js"));

var _blogRoute = _interopRequireDefault(require("./blogRoute.js"));

var _userRoute = _interopRequireDefault(require("./userRoute.js"));

var router = _express["default"].Router();

router.use("/user", _userRoute["default"]);
router.use("/", _route["default"]);
router.use("/", _blogRoute["default"]);
var _default = router;
exports["default"] = _default;