"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _database = _interopRequireDefault(require("../config/database.js"));

var _article_validation = _interopRequireDefault(require("../validation/article_validation.js"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var BlogController = /*#__PURE__*/function () {
  function BlogController() {
    (0, _classCallCheck2["default"])(this, BlogController);
  }

  (0, _createClass2["default"])(BlogController, null, [{
    key: "createBlog",
    value: function () {
      var _createBlog = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var auth;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                auth = (0, _article_validation["default"])(req.body);

                if (!auth.error) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.send({
                  error: auth.error.details[0].message
                }));

              case 5:
                _database["default"].cloudinary.uploader.upload(req.files.images.path, function (result) {
                  // console.log(auth)
                  try {
                    var blog = new _database["default"].blogModel({
                      title: auth.value.title,
                      body: auth.value.body,
                      image: result.url
                    });
                    blog.save();
                    return res.status(200).json(blog);
                  } catch (err) {
                    res.status(400).send({
                      error: "Failed to post this blog"
                    });
                  }
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createBlog(_x, _x2) {
        return _createBlog.apply(this, arguments);
      }

      return createBlog;
    }()
  }, {
    key: "getBlogs",
    value: function () {
      var _getBlogs = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var blogs;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _database["default"].blogModel.find({});

              case 3:
                blogs = _context2.sent;
                return _context2.abrupt("return", res.status(200).json(blogs));

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                res.status(400);
                res.send({
                  error: "No blog in the database!"
                });

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      function getBlogs(_x3, _x4) {
        return _getBlogs.apply(this, arguments);
      }

      return getBlogs;
    }()
  }, {
    key: "getOneBlog",
    value: function () {
      var _getOneBlog = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var blog;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _database["default"].blogModel.findOne({
                  _id: req.params.id
                });

              case 3:
                blog = _context3.sent;
                res.send(blog);
                _context3.next = 11;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                res.status(404);
                res.send({
                  error: "blog doesn't exist!"
                });

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      function getOneBlog(_x5, _x6) {
        return _getOneBlog.apply(this, arguments);
      }

      return getOneBlog;
    }()
  }, {
    key: "updateBlog",
    value: function () {
      var _updateBlog = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var blog;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _database["default"].blogModel.findOne({
                  _id: req.params.id
                });

              case 3:
                blog = _context4.sent;

                if (req.body.title) {
                  blog.title = req.body.title;
                }

                if (req.body.body) {
                  blog.body = req.body.body;
                }

                _context4.next = 8;
                return blog.save();

              case 8:
                res.send(blog);
                _context4.next = 15;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](0);
                res.status(404);
                res.send({
                  error: "Blog doesn't exist!"
                });

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 11]]);
      }));

      function updateBlog(_x7, _x8) {
        return _updateBlog.apply(this, arguments);
      }

      return updateBlog;
    }()
  }, {
    key: "deleteBlog",
    value: function () {
      var _deleteBlog = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _database["default"].blogModel.deleteOne({
                  _id: req.params.id
                });

              case 3:
                res.status(204).send({
                  message: "Blog is successfuly deleted"
                });
                _context5.next = 10;
                break;

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](0);
                res.status(404);
                res.send({
                  error: "Blog doesn't exist!"
                });

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 6]]);
      }));

      function deleteBlog(_x9, _x10) {
        return _deleteBlog.apply(this, arguments);
      }

      return deleteBlog;
    }()
  }, {
    key: "blogComment",
    value: function () {
      var _blogComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var comment, blog, commentValue;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                comment = {};
                _context6.next = 4;
                return _database["default"].blogModel.findOne({
                  _id: req.params.id
                });

              case 4:
                blog = _context6.sent;
                commentValue = {
                  body: req.body.body,
                  name: req.body.name
                };
                comment[_mongoose["default"].Types.ObjectId()] = commentValue;
                blog.comments.push(comment);
                _context6.next = 10;
                return blog.save();

              case 10:
                res.send(blog.comments);
                _context6.next = 17;
                break;

              case 13:
                _context6.prev = 13;
                _context6.t0 = _context6["catch"](0);
                res.status(404);
                res.send({
                  error: "Blog doesn't exist!"
                });

              case 17:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 13]]);
      }));

      function blogComment(_x11, _x12) {
        return _blogComment.apply(this, arguments);
      }

      return blogComment;
    }()
  }, {
    key: "bloglikes",
    value: function () {
      var _bloglikes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        var blog;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return _database["default"].blogModel.findOne({
                  _id: req.params.id
                });

              case 3:
                blog = _context7.sent;
                blog.likes += 1;
                _context7.next = 7;
                return blog.save();

              case 7:
                res.send(blog);
                _context7.next = 14;
                break;

              case 10:
                _context7.prev = 10;
                _context7.t0 = _context7["catch"](0);
                res.status(404);
                res.send({
                  error: "Blog doesn't exist!"
                });

              case 14:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 10]]);
      }));

      function bloglikes(_x13, _x14) {
        return _bloglikes.apply(this, arguments);
      }

      return bloglikes;
    }()
  }]);
  return BlogController;
}();

exports["default"] = BlogController;