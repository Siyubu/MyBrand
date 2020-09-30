
import express from 'express';

const router=express.Router();
import contactRouter from "./route.js";
import blogRouter from "./blogRoute.js"
import userRouter from "./userRoute.js"

router.use("/user", userRouter);
router.use("/", contactRouter);
router.use("/",blogRouter);

export default router;