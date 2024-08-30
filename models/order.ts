import { Schema, models, model } from "mongoose";

const ItemSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: [
      "Shirt",
      "Blouse",
      "Jeans",
      "Suit",
      "Dress",
      "Shoes",
      "Trouser",
      "Sweater",
    ],
  },
  fabric: {
    type: String,
    required: true,
    enum: ["Cotton", "Silk", "Wool", "Polyester", "Denim"],
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const OrderSchema = new Schema({
  id: { type: String, required: true, unique: true },
  orderDateTime: { type: Date, required: true, default: Date.now },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "On Process", "Finished"],
    default: "Pending",
  },
  price: { type: Number, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: { type: [ItemSchema], required: true },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
