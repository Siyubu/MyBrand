//const {postContactsMiddleware,getContactsMiddleware} = require("../middlewares/contactMiddleware") // new
import express from 'express';
import ContactController from '../controllers/contactController.js';
const router = express.Router();

router.get('/queries',ContactController.getContacts);
router.post('/query/create',ContactController.createContact);
router.delete('/queries/:id',ContactController.deleteContact);

  export default router

