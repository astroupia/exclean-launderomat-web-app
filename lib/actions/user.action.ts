"use server";

import { connectToDatabase } from "@/utils/database";
import { CreateUserParams, UpdateUserParams } from "@/types";
import mongoose from "mongoose";

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
    const user = await usersCollection.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    });
    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error getting user:", error);
    throw new Error("Failed to get user");
  }
}

export async function getUserRole(userId: string): Promise<string> {
  try {
    await connectToDatabase();
    const User = mongoose.model(
      "User",
      new mongoose.Schema({
        clerkId: String,
        role: String,
        // Add other fields as needed
      })
    );
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      console.log("User not found");
      return "customer"; // Default role if user not found
    }

    return user.role || "customer"; // Return "customer" if role is null or undefined
  } catch (error) {
    console.error("Error in getUserRole:", error);
    throw new Error("Failed to fetch user role");
  }
}
