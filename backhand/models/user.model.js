import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true }
  },
  {
    timestamps: true, //createAt updateAt
  }
);

const User = mongoose.model("User" , UserSchema);
export default User;