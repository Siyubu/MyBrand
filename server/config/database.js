import mongoose from "mongoose";
import env from "dotenv";
import contactModel from "../models/contactModel.js";

env.config();


    mongoose.connect(process.env.DEV_DB_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose default connection error:'));
db.once('open', () => {
  console.log('Mongoose connected')
});

export default { contactModel };
