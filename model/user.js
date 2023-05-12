import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },

  token: {
    type: String,
  },
});

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign(
//     { _id: this._id, name: this.name, isAdmin: this.isAdmin },
//     process.env.JWTPRIVATEKEY,
//     {
//       expiresIn: "24h",
//     }
//   );
//   return token;
// };

export default mongoose.model("User", userSchema); //create modal for us like collection
