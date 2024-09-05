"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/utils/database";
import { CreateUserParams, UpdateUserParams } from "@/types";
import User from "@/models/user"; // Import the User model

export async function createUser(userData: {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}) {
  try {
    await connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
}

export async function getUserById(userId: string) {
  try {
    // Ensure database connection is established
    await connectToDatabase();

    console.log(`Searching for user with clerkId: ${userId}`);

    const user = await User.findOne({ clerkId: userId }).lean();

    if (!user) {
      console.log(`User with clerkId not found`);
      return null;
    }

    console.log(`User found: ${JSON.stringify(user)}`);
    return user; // Returning the plain user object directly
  } catch (error) {
    throw new Error(`Error fetching user with clerkId`);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });
    if (!updatedUser) throw new Error("User update failed");
    console.log("User Updated");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

export async function getUserRole(userId: string): Promise<string> {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      console.log("User not found");
      return "customer"; // Default role if user not found
    }
    return user.role || "customer";
  } catch (error) {
    throw new Error("Failed to fetch user role");
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();
    const userToDelete = await User.findOne({ clerkId });
    if (!userToDelete) {
      throw new Error("User not found");
    }
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/"); // Revalidate the path where user data is displayed
    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
}

export async function getUserByEmail(email: string | undefined) {
  try {
    await connectToDatabase();
    console.log("Connected to database");
    if (email === null) {
      console.log("Email is null, cannot search for user");
      return null;
    }

    console.log(`Searching for user with email: ${email}`);

    const user = await User.findOne({ email: email?.toLowerCase() });

    if (!user) {
      console.log(`User with email ${email} not found`);
      return null;
    }

    console.log(`User found:`, JSON.stringify(user));
    return user.toObject();
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    throw error;
  }
}
