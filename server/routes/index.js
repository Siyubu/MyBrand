
import express from 'express';
import passport from 'passport';
import passportConf from '../passport.js';
const router=express.Router();
import contactRouter from "./route.js";
import blogRouter from "./blogRoute.js"
import userRouter from "./userRoute.js"

router.use("/", contactRouter);
router.use("/",passport.authenticate('jwt', { session : false }),blogRouter);
router.use("/user", userRouter);
export default router;