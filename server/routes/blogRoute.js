import express from 'express';
import ContactController from '../controllers/contactController.js';
import passport from 'passport';
import passportConf from '../passport.js';
import BlogController from '../controllers/blogController.js';
import multipart from 'connect-multiparty';
const router = express.Router();
var multipartMiddleware = multipart();

/*****************Blog********************** */ 

router.get('/articles',BlogController.getBlogs);
router.get('/article/:id',BlogController.getOneBlog);
router.post('/article/create',passport.authenticate('jwt', { session : false }),multipartMiddleware,BlogController.createBlog);
router.post('/article/comment/:id',BlogController.blogComment);
router.post('/article/like/:id', BlogController.bloglikes)
router.delete('/article/:id',passport.authenticate('jwt', { session : false }),BlogController.deleteBlog);
router.patch('/article/:id',passport.authenticate('jwt', { session : false }),BlogController.updateBlog)

  export default router
