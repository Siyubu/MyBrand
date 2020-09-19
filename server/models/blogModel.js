import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  body: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
  },
comments: {
    type: [Object],
},
likes:{
    type: Number,
    default:0
},
shares:{
    type: Number,
}

})

const blogModel = mongoose.model("blogs",blogSchema);
export default blogModel;