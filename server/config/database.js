import mongoose from "mongoose";
import env from "dotenv";
import contactModel from "../models/contactModel.js";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js"
import cloudinary from 'cloudinary';

env.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETE
});


    mongoose.connect(process.env.PROD_DB_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose default connection error:'));
db.once('open', () => {
  console.log('Mongoose connected')
});

export default { contactModel,blogModel,userModel,cloudinary};
