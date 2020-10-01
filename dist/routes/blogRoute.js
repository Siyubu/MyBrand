"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _contactController = _interopRequireDefault(require("../controllers/contactController.js"));

var _passport = _interopRequireDefault(require("passport"));

var _passport2 = _interopRequireDefault(require("../passport.js"));

var _blogController = _interopRequireDefault(require("../controllers/blogController.js"));

var _connectMultiparty = _interopRequireDefault(require("connect-multiparty"));

var router = _express["default"].Router();

var multipartMiddleware = (0, _connectMultiparty["default"])();
/*****************Blog********************** */

router.get('/articles', _passport["default"].authenticate('jwt', {
  session: false
}), _blogController["default"].getBlogs);
router.get('/article/:id', _passport["default"].authenticate('jwt', {
  session: false
}), _blogController["default"].getOneBlog);
router.post('/article/create', _passport["default"].authenticate('jwt', {
  session: false
}), multipartMiddleware, _blogController["default"].createBlog);
router.post('/article/comment/:id', _passport["default"].authenticate('jwt', {
  session: false
}), _blogController["default"].blogComment);
router.post('/article/like/:id', _passport["default"].authenticate('jwt', {
  session: false
}), _blogController["default"].bloglikes);
router["delete"]('/article/:id', _passport["default"].authenticate('jwt', {
  session: false
}), _blogController["default"].deleteBlog);
router.patch('/article/:id', _passport["default"].authenticate('jwt', {
  session: false
}), _blogController["default"].updateBlog);
var _default = router;
exports["default"] = _default;