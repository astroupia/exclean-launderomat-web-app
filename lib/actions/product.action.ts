"use server";

import { connectToDatabase } from "@/utils/database";
import { Product, CreateProductParams, UpdateProductParams } from "@/types";
import ProductModel from "@/models/product";

const mapToProduct = (doc: any): Product => ({
  id: doc.id,
  name: doc.name,
  quantity: doc.quantity,
  unitPrice: doc.unitPrice,
});

// Retrieves all products
export async function getAllProducts(): Promise<Product[]> {
  await connectToDatabase();
  const products = await ProductModel.find().lean();
  console.log(products);
  return products.map(mapToProduct);
}

// Retrieves a product by ID
export async function getProductById(id: string): Promise<Product | null> {
  await connectToDatabase();
  const product = await ProductModel.findOne({ id }).lean();
  return product ? mapToProduct(product) : null;
}

// Creates a new product
export async function createProduct(
  productData: CreateProductParams
): Promise<Product> {
  await connectToDatabase();
  const newProduct = new ProductModel({
    ...productData,
    id: `prod_${Date.now()}`,
  });
  const savedProduct = await newProduct.save();
  return mapToProduct(savedProduct.toObject());
}

// Updates a product by ID
export async function updateProductById(
  id: string,
  updateData: UpdateProductParams
): Promise<Product | null> {
  await connectToDatabase();
  const updatedProduct = await ProductModel.findOneAndUpdate(
    { id },
    { $set: updateData },
    { new: true, lean: true }
  );
  return updatedProduct ? mapToProduct(updatedProduct) : null;
}

// Deletes a product by ID
export async function deleteProductById(
  id: string
): Promise<{ message: string }> {
  await connectToDatabase();
  const result = await ProductModel.deleteOne({ id });
  if (result.deletedCount === 0) throw new Error("Product not found");
  return { message: "Product deleted successfully" };
}
