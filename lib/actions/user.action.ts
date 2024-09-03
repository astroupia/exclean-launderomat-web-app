"use server";

import { connectToDatabase } from "@/utils/database";
import { CreateUserParams, UpdateUserParams } from "@/types";
import { ObjectId } from "mongodb";

export async function createUser(user: CreateUserParams) {
  try {
    console.log("Attempting to create user");
    const { db } = await connectToDatabase();
    console.log("Database connection successful, creating user");
    const usersCollection = db.collection("users");
    const result = await usersCollection.insertOne(user);
    const newUser = await usersCollection.findOne({ _id: result.insertedId });
    console.log("User created successfully");
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection("users");
    const updatedUser = await usersCollection.findOneAndUpdate(
      { clerkId },
      { $set: user },
      { returnDocument: "after" }
    );
    if (!updatedUser.value) throw new Error("User Not Found");
    return JSON.parse(JSON.stringify(updatedUser.value));
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

export async function getUserById(userId: string) {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error getting user:", error);
    throw new Error("Failed to get user");
  }
}

export async function getUserRole(userId: string): Promise<string> {
  try {
    console.log("getUserRole called with userId:", userId);
    const { db } = await connectToDatabase();
    console.log("Database connection successful, fetching user role");
    const user = await db.collection("users").findOne({ clerkId: userId });

    if (!user) {
      console.log("User not found");
      return "customer"; // Default role if user not found
    }

    console.log("User role:", user.role);
    return user.role;
  } catch (error) {
    console.error("Error in getUserRole:", error);
    throw new Error("Failed to fetch user role");
  }
}
