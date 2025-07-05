import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, default: "" },
    phoneNumber: { type: String, default: "0000000000" },
    address: { type: Object, default: { line1: "", line2: "" } },
    dob: { type: String, default: "Not Selected" },
    gender: { type: String, default: "Not Selected" },
  },
  { minimize: false }
);

const USER = mongoose.model("user", userSchema);
export default USER;
