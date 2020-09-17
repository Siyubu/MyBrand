import db from "../config/database.js";
import contactValidation from "../middlewares/contact_validation.js";


export default class ContactController {
  static async createContact(req, res) {
      console.log(req.body);
      // res.send("Whhhhhhhhhhhh");
    console.log("**********");
    const auth = contactValidation(req.body);
   
    if (auth.error){
       res.send({error:auth.error.details[0].message})

    }
    else
    {
      try 
      {
        const created = new db.contactModel({
        names: auth.value.names,
        subject: auth.value.subject,
        email: auth.value.email,
        message: auth.value.message
        });
        await created.save();
         res.status(200).json(created);
      
      } 
      catch (err) 
      {
         res.status(500).json(err);
      }

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
