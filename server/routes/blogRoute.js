import express from 'express';
import ContactController from '../controllers/contactController.js';
import BlogController from '../controllers/blogController.js';
import multipart from 'connect-multiparty';
const router = express.Router();
var multipartMiddleware = multipart();

/*****************Blog********************** */ 

router.get('/articles',BlogController.getBlogs);
router.get('/article/:id',BlogController.getOneBlog);
router.post('/article/create',multipartMiddleware,BlogController.createBlog);
router.post('/article/comment/:id',BlogController.blogComment);
router.delete('/article/:id',BlogController.deleteBlog);
router.patch('/article/:id',BlogController.updateBlog)

  export default router
