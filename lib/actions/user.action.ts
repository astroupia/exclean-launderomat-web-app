"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../../utils/database";
import { CreateUserParams, UpdateUserParams } from "@/types";
import User from "../../models/user"; // Import the User model

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    console.log("User Created");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error getting user:", error);
    throw new Error("Failed to get user");
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
    console.error("Error in getUserRole:", error);
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
    // If you have Order and Campaign models, uncomment and adjust these lines
    // await Order.updateMany({ buyer: userToDelete._id }, { $unset: { buyer: 1 } });
    // await Campaign.updateMany({ organizer: userToDelete._id }, { $pull: { organizer: userToDelete._id } });
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/"); // Revalidate the path where user data is displayed
    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
}

// Test function
export async function testUserFunctions() {
  try {
    console.log("Starting test function...");

    // 1. Create a dummy user
    const dummyUser: CreateUserParams = {
      clerkId: "test_clerk_id_" + Date.now(),
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      role: "customer",
    };

    console.log("Creating dummy user...");
    const createdUser = await createUser(dummyUser);
    console.log("Dummy user created:", createdUser);

    // 2. Retrieve the user's role
    console.log("Retrieving user role...");
    const userRole = await getUserRole(createdUser.clerkId);
    console.log("User role:", userRole);

    // 3. Update the user
    const updateData: UpdateUserParams = {
      firstName: "Updated",
      lastName: "TestUser",
    };

    console.log("Updating user...");
    const updatedUser = await updateUser(createdUser.clerkId, updateData);
    console.log("Updated user:", updatedUser);

    // 4. Get user by ID
    console.log("Retrieving user by ID...");
    const retrievedUser = await getUserById(createdUser._id);
    console.log("Retrieved user:", retrievedUser);

    // 5. Delete the user
    console.log("Deleting user...");
    const deletedUser = await deleteUser(createdUser.clerkId);
    console.log("Deleted user:", deletedUser);

    console.log("Test completed successfully");
    return "Test completed successfully";
  } catch (error) {
    console.error("Error in test function:", error);
    return (
      "Test failed: " + (error instanceof Error ? error.message : String(error))
    );
  }
}
