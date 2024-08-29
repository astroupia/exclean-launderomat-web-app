import { Schema, models, model } from "mongoose";

const PaymentSchema = new Schema({
  id: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  payedDateTime: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    required: true,
    default: "Pending",
  },
  payer: { type: Schema.Types.ObjectId, ref: "User" },
  order: { type: Schema.Types.ObjectId, ref: "Order" },
});

const Payment = models.Payment || model("Paymnet", PaymentSchema);

export default Payment;
