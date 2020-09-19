import mongoose from "mongoose";
import bcrypt from 'bcrypt';


const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
      },
      password : {
        type : String,
        required : true
      }
});

UserSchema.pre('save', async function(next){
  try{
    const salt= await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  }
  catch(err){
    next(err)
  }
   
  });

  UserSchema.methods.isValidPassword = async function(password){
    try{
      return await bcrypt.compare(password, this.password);
    
    }
    catch(err){
      throw new Error(err)
    }
  }
  const UserModel = mongoose.model('user',UserSchema);

  export default UserModel;