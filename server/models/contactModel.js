
import mongoose from "mongoose";
const ContactSchema = new mongoose.Schema({
	
	names: String,
	subject: String,
	email: String,
    message:String
});
console.log("Contact Model");

const contactModel = mongoose.model('Contact', ContactSchema );
export default contactModel;