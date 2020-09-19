import express from 'express';
import ContactController from '../controllers/contactController.js';
import BlogController from '../controllers/blogController.js';
import multipart from 'connect-multiparty';
const router = express.Router();
var multipartMiddleware = multipart();

/*****************Blog********************** */ 
router.get('/',BlogController.getBlogs);
router.get('/:id',BlogController.getOneBlog);
router.post('/create',multipartMiddleware,BlogController.createBlog);
router.post('/comment/:id',BlogController.blogComment);
router.delete('/:id',BlogController.deleteBlog);
router.patch('/:id',BlogController.updateBlog)

  export default router
