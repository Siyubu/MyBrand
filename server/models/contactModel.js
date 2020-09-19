
import mongoose from "mongoose";
const ContactSchema = new mongoose.Schema({
	
	names: {
        type : String,
        required : true,
	},
	subject: {
        type : String,
        required : true,
	},
	email: {
        type : String,
        required : true,
	},
    message:{
        type : String,
        required : true,
	}
});
console.log("Contact Model");

const contactModel = mongoose.model('Contact', ContactSchema );
export default contactModel;