"use server";

import { connectToDatabase } from "@/utils/database";
import {
  CreateOrderParams,
  UpdateOrderParams,
  GetOrderParams,
  GetUserOrdersParams,
} from "@/types";
import Order from "@/models/order";
import User from "@/models/user";

export async function createOrder(params: CreateOrderParams) {
  try {
    await connectToDatabase();

    console.log("Attempting to find user with clerkId:", params.userId);

    // Validate user by userId
    const user = await User.findOne({ clerkId: params.userId });

    if (!user) {
      console.log("User not found for clerkId:", params.userId);
      throw new Error(`User not found for clerkId: ${params.userId}`);
    }

    console.log("User found:", user);

    // Create the order
    const newOrder = new Order({
      ...params.order,
      owner: user._id,
    });

    console.log("Attempting to save new order:", newOrder);

    await newOrder.save();

    console.log("Order saved successfully");

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error(
      "Failed to create order: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

export async function getOrderById({ id }: GetOrderParams) {
  try {
    await connectToDatabase();

    const order = await Order.findById(id).populate("owner");
    if (!order) {
      throw new Error("Order not found");
    }

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.error("Error getting order:", error);
    throw new Error("Failed to get order");
  }
}

export async function updateOrder(id: string, params: UpdateOrderParams) {
  try {
    await connectToDatabase();

    const updatedOrder = await Order.findByIdAndUpdate(id, params, {
      new: true,
    });
    if (!updatedOrder) {
      throw new Error("Order not found");
    }

    return JSON.parse(JSON.stringify(updatedOrder));
  } catch (error) {
    console.error("Error updating order:", error);
    throw new Error("Failed to update order");
  }
}

export async function deleteOrder(id: string) {
  try {
    await connectToDatabase();

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      throw new Error("Order not found");
    }

    return JSON.parse(JSON.stringify(deletedOrder));
  } catch (error) {
    console.error("Error deleting order:", error);
    throw new Error("Failed to delete order");
  }
}

export async function getUserOrders({ userId }: GetUserOrdersParams) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      throw new Error("User not found");
    }

    const orders = await Order.find({ owner: user._id });
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error("Error getting user orders:", error);
    throw new Error("Failed to get user orders");
  }
}

// Test function
export async function testOrderFunctions() {
  try {
    console.log("Starting order test function...");

    // 1. Create a dummy user (you might want to use an existing user instead)
    const dummyUser = await User.create({
      clerkId: "test_clerk_id_" + Date.now(),
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      role: "customer",
    });

    // 2. Create a dummy order
    const dummyOrder: CreateOrderParams = {
      userId: dummyUser.clerkId,
      order: {
        id: "test_order_" + Date.now(),
        orderDateTime: new Date(),
        status: "Pending",
        type: ["Shirt"],
        cleaningType: "Dry",
        price: 15,
      },
    };

    console.log("Creating dummy order...");
    const createdOrder = await createOrder(dummyOrder);
    console.log("Dummy order created:", createdOrder);

    // 3. Get order by ID
    console.log("Retrieving order by ID...");
    const retrievedOrder = await getOrderById({ id: createdOrder._id });
    console.log("Retrieved order:", retrievedOrder);

    // 4. Update the order
    const updateData: UpdateOrderParams = {
      status: "In Progress",
    };

    console.log("Updating order...");
    const updatedOrder = await updateOrder(createdOrder._id, updateData);
    console.log("Updated order:", updatedOrder);

    // 5. Get user orders
    console.log("Retrieving user orders...");
    const userOrders = await getUserOrders({ userId: dummyUser.clerkId });
    console.log("User orders:", userOrders);

    // 6. Delete the order
    console.log("Deleting order...");
    const deletedOrder = await deleteOrder(createdOrder._id);
    console.log("Deleted order:", deletedOrder);

    // 7. Clean up - delete the dummy user
    await User.findByIdAndDelete(dummyUser._id);

    console.log("Order test completed successfully");
    return "Order test completed successfully";
  } catch (error) {
    console.error("Error in order test function:", error);
    return (
      "Order test failed: " +
      (error instanceof Error ? error.message : String(error))
    );
  }
}
