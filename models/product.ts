import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  quantity: { type: String, required: true },
  unitPrice: { type: String, required: true },
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
