import { connectToDatabase } from "@/utils/database";
import { handleError } from "@/lib/utils";
import { Product as ProductType } from "@/types";

// Function to get all products
export const getAllProducts = async (): Promise<ProductType[]> => {
  try {
    const { db } = await connectToDatabase();
    const productsCollection = db.collection("products");
    const products = await productsCollection.find({}).toArray();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    handleError(error);
    return [];
  }
};

// Function to get a product by ID
export const getProductById = async (
  id: string
): Promise<ProductType | null> => {
  try {
    const { db } = await connectToDatabase();
    const productsCollection = db.collection("products");
    const product = await productsCollection.findOne({ id });
    if (!product) {
      throw new Error("Product not found");
    }
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    handleError(error);
    return null;
  }
};

// Function to create a new product
export const createProduct = async (
  productData: ProductType
): Promise<ProductType | null> => {
  try {
    const { db } = await connectToDatabase();
    const productsCollection = db.collection("products");
    const result = await productsCollection.insertOne(productData);
    return JSON.parse(JSON.stringify(result.insertedId));
  } catch (error) {
    handleError(error);
    return null;
  }
};

// Function to update an existing product by ID
export const updateProductById = async (
  id: string,
  updateData: Partial<ProductType>
): Promise<ProductType | null> => {
  try {
    const { db } = await connectToDatabase();
    const productsCollection = db.collection("products");
    const updatedProduct = await productsCollection.findOneAndUpdate(
      { id },
      { $set: updateData },
      { returnDocument: "after" }
    );
    if (!updatedProduct) {
      throw new Error("Product not found");
    }
    return JSON.parse(JSON.stringify(updatedProduct.value));
  } catch (error) {
    handleError(error);
    return null;
  }
};

// Function to delete a product by ID
export const deleteProductById = async (
  id: string
): Promise<{ message: string } | null> => {
  try {
    const { db } = await connectToDatabase();
    const productsCollection = db.collection("products");
    const result = await productsCollection.deleteOne({ id });
    if (result.deletedCount === 0) {
      throw new Error("Product not found");
    }
    return { message: "Product deleted successfully" };
  } catch (error) {
    handleError(error);
    return null;
  }
};
