import db from "../config/database.js";
// import { onError, onSuccess } from "../utils/response";

export default class UserController {
  static async createContact(req, res) {
    try 
    {
      const created = await db.contactModel.create(req.body);
      return res.status(200).json(created);
    
    } 
    catch (err) 
    {
      return res.status(500).json(err);
    }
  }
  static async getContacts(req, res) {
    try {
      const contacts = await db.contactModel.find({});
      return res.status(200).json(contacts);
    } catch (err) {
        return res.status(500).json(err);
    }
  }

  static async deleteContact(req, res) {
    try {
       await db.contactModel.deleteOne({ _id: req.params.id });
      return res.status(204).send();
    } catch (err) {
        return res.status(404).json(err);
    }
  }
}
