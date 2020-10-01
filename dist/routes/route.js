"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _contactController = _interopRequireDefault(require("../controllers/contactController.js"));

//const {postContactsMiddleware,getContactsMiddleware} = require("../middlewares/contactMiddleware") // new
var router = _express["default"].Router();
/*****************Query********************** */


router.get('/queries', _contactController["default"].getContacts);
router.post('/query/create', _contactController["default"].createContact);
router["delete"]('/query/:id', _contactController["default"].deleteContact);
var _default = router;
exports["default"] = _default;