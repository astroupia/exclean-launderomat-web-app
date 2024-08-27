"use server";

import { handleError } from "@/lib/utils";
import User from "@/models/user";
import { CreateUserPramas, UpdateUserPramas } from "@/types";
import { connectToDatabase } from "@/utils/database";

export async function createUser(user: CreateUserPramas) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: String, user: UpdateUserPramas) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });
    if (!updatedUser) throw Error("User Not Found");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}
