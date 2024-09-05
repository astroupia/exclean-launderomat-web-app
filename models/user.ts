import { Schema, models, model } from "mongoose";

console.log("Defining User model...");

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, default: "" }, // Change this line
  role: { type: String, required: true, default: "customer" },
});

// console.log("User schema defined:", UserSchema);

const User = models.User || model("User", UserSchema);

// console.log("User model:", User);

export default User;
