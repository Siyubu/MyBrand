//const {postContactsMiddleware,getContactsMiddleware} = require("../middlewares/contactMiddleware") // new
import express from 'express';
import ContactController from '../controllers/contactController.js';
const router = express.Router();

/*****************Query********************** */
router.get('/',ContactController.getContacts);
router.post('/create',ContactController.createContact);
router.delete('/:id',ContactController.deleteContact);

  export default router

