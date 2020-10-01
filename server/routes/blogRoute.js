import express from 'express';
import ContactController from '../controllers/contactController.js';
import passport from 'passport';
import passportConf from '../passport.js';
import BlogController from '../controllers/blogController.js';
import multipart from 'connect-multiparty';
const router = express.Router();
var multipartMiddleware = multipart();

/*****************Blog********************** */ 

router.get('/articles',passport.authenticate('jwt', { session : false }),BlogController.getBlogs);
router.get('/article/:id',passport.authenticate('jwt', { session : false }),BlogController.getOneBlog);
router.post('/article/create',passport.authenticate('jwt', { session : false }),multipartMiddleware,BlogController.createBlog);
router.post('/article/comment/:id',passport.authenticate('jwt', { session : false }),BlogController.blogComment);
router.post('/article/like/:id',passport.authenticate('jwt', { session : false }), BlogController.bloglikes)
router.delete('/article/:id',passport.authenticate('jwt', { session : false }),BlogController.deleteBlog);
router.patch('/article/:id',passport.authenticate('jwt', { session : false }),BlogController.updateBlog)

  export default router
