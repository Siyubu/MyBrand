//const {postContactsMiddleware,getContactsMiddleware} = require("../middlewares/contactMiddleware") // new
import express from 'express';
import ContactController from '../controllers/contactController.js';
const router = express.Router();

/*****************Query********************** */
router.get('/queries',ContactController.getContacts);
router.post('/query/create',ContactController.createContact);
router.delete('/query/:id',ContactController.deleteContact);

  export default router

