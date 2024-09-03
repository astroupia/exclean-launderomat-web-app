import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  id: { type: String, required: true },
  orderDateTime: { type: Date, required: true },
  status: { type: String, required: true },
  type: { type: String, required: true },
  cleaningType: { type: String, required: true },
  price: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

console.log("Defining Order model...");
const Order = models.Order || model("Order", OrderSchema);
console.log("Order model:", Order);

export default Order;
