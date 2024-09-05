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

export async function getAllProducts(): Promise<Product[]> {
  try {
    await connectToDatabase();
    const products = await ProductModel.find().lean();
    return products.map(mapToProduct);
  } catch (error) {
    console.error("Error getting all products:", error);
    throw new Error("Failed to get products");
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    await connectToDatabase();
    const product = await ProductModel.findOne({ id }).lean();
    return product ? mapToProduct(product) : null;
  } catch (error) {
    console.error("Error getting product:", error);
    throw new Error("Failed to get product");
  }
}

export async function createProduct(
  productData: CreateProductParams
): Promise<Product> {
  try {
    await connectToDatabase();
    const newProduct = new ProductModel({
      ...productData,
      id: `prod_${Date.now()}`,
    });
    const savedProduct = await newProduct.save();
    return mapToProduct(savedProduct.toObject());
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
}

export async function updateProductById(
  id: string,
  updateData: UpdateProductParams
): Promise<Product | null> {
  try {
    await connectToDatabase();
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { id },
      { $set: updateData },
      { new: true, lean: true }
    );
    return updatedProduct ? mapToProduct(updatedProduct) : null;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
}

export async function deleteProductById(
  id: string
): Promise<{ message: string }> {
  try {
    await connectToDatabase();
    const result = await ProductModel.deleteOne({ id });
    if (result.deletedCount === 0) {
      throw new Error("Product not found");
    }
    return { message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
}
