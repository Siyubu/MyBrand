//const {postContactsMiddleware,getContactsMiddleware} = require("../middlewares/contactMiddleware") // new
import express from 'express';
import ContactController from '../controllers/contactController.js';
const router = express.Router();

router.route('/contact')
  .get(ContactController.getContacts)
  .post(ContactController.createContact)

  export default router

