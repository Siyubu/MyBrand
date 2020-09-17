
import express from 'express';
const router=express.Router();
import contactRouter from "./route.js";
import blogRouter from "./blogRoute.js"

router.use("/query", contactRouter);
router.use("/article",blogRouter);
export default router;