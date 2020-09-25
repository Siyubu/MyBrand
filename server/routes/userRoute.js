import express from 'express';
import passport from 'passport';
import passportConf from '../passport.js';
import UserController from '../controllers/userController.js';
const router = express.Router();

router.post('/signup',UserController.signUp);
//router.post('/secret',passport.authenticate('jwt', { session : false }),UserController.signUp);
router.post('/signin',passport.authenticate('local', { session : false }),UserController.signIn);

export default router