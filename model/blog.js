import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
   
  },
 user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
}
});

export default mongoose.model("Blog", blogSchema);
