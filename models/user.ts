import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: "Customer" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const User = models.User || model("User", UserSchema);

export default User;
