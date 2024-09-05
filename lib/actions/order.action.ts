"use server";
import Order from "@/models/order"; // Assume you have defined these models
import User from "@/models/user";
import { connectToDatabase } from "@/utils/database";
import {
  CreateOrderParams,
  GetOrderParams,
  UpdateOrderParams,
  GetUserOrdersParams,
  OrderType,
} from "@/types";

// Create Order
export async function createOrder(
  params: CreateOrderParams
): Promise<typeof Order> {
  try {
    // Ensure database connection
    await connectToDatabase();

    // Find the user
    const user = await User.findOne({ clerkId: params.userId });
    if (!user) {
      throw new Error(`User not found for clerkId: ${params.userId}`);
    }

    // Create and save the order
    const newOrder = new Order({
      ...params.order,
      owner: user._id, // Set the owner field to the user's _id
      userId: user._id,
      orderDateTime: new Date(),
    });

    const savedOrder = await newOrder.save();

    return savedOrder.toObject();
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error(`Failed to create order: ${(error as Error).message}`);
  }
}

// Get Order by ID
export async function getOrderById({ id }: GetOrderParams) {
  try {
    await connectToDatabase();
    const order = await Order.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }
    return order.toObject();
  } catch (error) {
    console.error("Error getting order:", error);
    throw new Error("Failed to get order");
  }
}

// Update Order
export async function updateOrder(id: string, params: UpdateOrderParams) {
  try {
    await connectToDatabase();
    const updatedOrder = await Order.findByIdAndUpdate(id, params, {
      new: true,
    });
    if (!updatedOrder) {
      throw new Error("Order not found");
    }
    return updatedOrder.toObject();
  } catch (error) {
    console.error("Error updating order:", error);
    throw new Error("Failed to update order");
  }
}

// Delete Order
export async function deleteOrder(id: string) {
  try {
    await connectToDatabase();
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      throw new Error("Order not found");
    }
    return deletedOrder.toObject();
  } catch (error) {
    console.error("Error deleting order:", error);
    throw new Error("Failed to delete order");
  }
}

// Get User Orders
export async function getUserOrders(userId: string) {
  try {
    connectToDatabase();

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    const userOrders = orders.map((order) => ({
      _id: order._id.toString(),
      orderDateTime: order.orderDateTime,
      status: order.status,
      type: order.type,
      cleaningType: order.cleaningType,
      price: order.price,
      // Add other necessary fields
    }));

    return userOrders;
  } catch (error) {
    console.error("Error getting user orders:", error);
    throw new Error("Failed to get user orders");
  }
}

// Get All Orders
export async function getAllOrders(): Promise<(typeof Order)[]> {
  try {
    await connectToDatabase();
    const orders = await Order.find();
    return orders.map((order) => order.toObject());
  } catch (error) {
    console.error("Error getting all orders:", error);
    throw new Error("Failed to get all orders");
  }
}

// Get Orders by Clerk ID
export async function getOrders(clerkId: string): Promise<(typeof Order)[]> {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error(`User not found for clerkId: ${clerkId}`);
    }
    const orders = await Order.find({ userId: user._id });
    return orders.map((order) => order.toObject());
  } catch (error) {
    console.error("Error getting orders:", error);
    throw new Error("Failed to get orders");
  }
}

// Update Order Status
export async function updateOrderStatus(
  orderId: string,
  newStatus: string
): Promise<typeof Order | null> {
  try {
    await connectToDatabase();
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: newStatus },
      { new: true }
    );
    return updatedOrder ? updatedOrder.toObject() : null;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
}
