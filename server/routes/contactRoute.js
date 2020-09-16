//const {postContactsMiddleware,getContactsMiddleware} = require("../middlewares/contactMiddleware") // new
import express from 'express';
import ContactController from '../controllers/contactController.js';
import BlogController from '../controllers/blogController.js';
import multipart from 'connect-multiparty';
const router = express.Router();
var multipartMiddleware = multipart();

/*****************Query********************** */
router.get('/queries',ContactController.getContacts);
router.post('/query/create',ContactController.createContact);
router.delete('/queries/:id',ContactController.deleteContact);

/*****************Blog********************** */ 
router.get('/articles',BlogController.getBlogs);
router.get('/articles/:id',BlogController.getOneBlog);
router.post('/article/create',multipartMiddleware,BlogController.createBlog);
router.delete('/articles/:id',BlogController.deleteBlog);
router.patch('/articles/:id',BlogController.updateBlog)

  export default router

