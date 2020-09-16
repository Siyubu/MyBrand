const Contact=require('../models/contactModel');

console.log("Contact Middleware");

const postContactsMiddleware= (req, res)=>{
    console.log("************************************");
    console.log("Contact Middleware "+ req.body.names);
    const contact = new Contact({
		fullName: req.body.names,
        subject: req.body.subject,
        email: req.body.email,
		message: req.body.message
	})
	  contact.save();
	return res.status(200).json(contact);
}

const getContactsMiddleware= async(req, rest)=>{
        console.log("Contact Middleware "+ req.body.names);
        const contact = await Contact.find();
        return res.status(200).json(contact);
}



exports.getContactsMiddleware=getContactsMiddleware;
exports.postContactsMiddleware=postContactsMiddleware;
