import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  id: { type: String, required: true },
  orderDateTime: { type: Date, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "In Progress", "Completed", "Cancelled"], // Add possible status values
  },
  type: [{ type: String, required: true }], // Array of strings
  cleaningType: {
    type: String,
    required: true,
    enum: ["Dry", "Wet", "Steam", "Other"], // Add possible cleaning types
  },
  price: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

console.log("Defining Order model...");
const Order = models.Order || model("Order", OrderSchema);
console.log("Order model:", Order);

export default Order;
