const express= require('express');
const contactRouter=require("./contactRoute");
const router=express.Router();

router.use("/contact", contactRouter);
module.exports = router;