"use server";

import { connectToDatabase } from "@/utils/database";
import { Product, CreateProductParams, UpdateProductParams } from "@/types";
import ProductModel from "@/models/product";

export async function getAllProducts(): Promise<Product[]> {
  try {
    await connectToDatabase();
    const products = await ProductModel.find();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error getting all products:", error);
    throw new Error("Failed to get products");
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    await connectToDatabase();
    const product = await ProductModel.findOne({ id });
    if (!product) {
      throw new Error("Product not found");
    }
    return JSON.parse(JSON.stringify(product));
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
      id: `prod_${Date.now()}`, // Generate a unique ID
    });
    await newProduct.save();
    return JSON.parse(JSON.stringify(newProduct));
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
      { new: true }
    );
    if (!updatedProduct) {
      throw new Error("Product not found");
    }
    return JSON.parse(JSON.stringify(updatedProduct));
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

// Test function
export async function testProductFunctions() {
  try {
    console.log("Starting product test function...");

    // 1. Create a dummy product
    const dummyProduct: CreateProductParams = {
      name: "Test Product",
      quantity: "100",
      unitPrice: "9.99",
    };

    console.log("Creating dummy product...");
    const createdProduct = await createProduct(dummyProduct);
    console.log("Dummy product created:", createdProduct);

    // 2. Get product by ID
    console.log("Retrieving product by ID...");
    const retrievedProduct = await getProductById(createdProduct.id);
    console.log("Retrieved product:", retrievedProduct);

    // 3. Update the product
    const updateData: UpdateProductParams = {
      quantity: "150",
      unitPrice: "10.99",
    };

    console.log("Updating product...");
    const updatedProduct = await updateProductById(
      createdProduct.id,
      updateData
    );
    console.log("Updated product:", updatedProduct);

    // 4. Get all products
    console.log("Retrieving all products...");
    const allProducts = await getAllProducts();
    console.log("All products:", allProducts);

    // 5. Delete the product
    console.log("Deleting product...");
    const deleteResult = await deleteProductById(createdProduct.id);
    console.log("Delete result:", deleteResult);

    console.log("Product test completed successfully");
    return "Product test completed successfully";
  } catch (error) {
    console.error("Error in product test function:", error);
    return (
      "Product test failed: " +
      (error instanceof Error ? error.message : String(error))
    );
  }
}
