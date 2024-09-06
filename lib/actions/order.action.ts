"use server";
import Order from "@/models/order";
import User from "@/models/user";
import { connectToDatabase } from "@/utils/database";
import { CreateOrderParams, GetOrderParams, UpdateOrderParams } from "@/types";

// Creates a new order
export async function createOrder(params: CreateOrderParams) {
  await connectToDatabase();
  const user = await User.findOne({ clerkId: params.userId });
  if (!user) throw new Error(`User not found for clerkId: ${params.userId}`);
  const newOrder = new Order({
    ...params.order,
    owner: user._id,
    userId: user._id,
    orderDateTime: new Date(),
  });
  return (await newOrder.save()).toObject();
}

// Retrieves an order by its ID
export async function getOrderById({ id }: GetOrderParams) {
  await connectToDatabase();
  const order = await Order.findById(id);
  if (!order) throw new Error("Order not found");
  return order.toObject();
}

// Updates an existing order
export async function updateOrder(id: string, params: UpdateOrderParams) {
  await connectToDatabase();
  const updatedOrder = await Order.findByIdAndUpdate(id, params, { new: true });
  if (!updatedOrder) throw new Error("Order not found");
  return updatedOrder.toObject();
}

// Deletes an order
export async function deleteOrder(id: string) {
  await connectToDatabase();
  const deletedOrder = await Order.findByIdAndDelete(id);
  if (!deletedOrder) throw new Error("Order not found");
  return deletedOrder.toObject();
}

// Retrieves all orders for a user
export async function getUserOrders(clerkId: string) {
  await connectToDatabase();

  // Find the user by clerkId
  const user = await User.findOne({ clerkId });
  if (!user) throw new Error(`User not found for clerkId: ${clerkId}`);

  // Find orders using the user's _id
  const orders = await Order.find({ owner: user._id }).sort({ createdAt: -1 });

  return orders.map((order) => ({
    ...order.toObject(),
    _id: order._id.toString(),
    owner: order.owner.toString(),
    orderDateTime: order.orderDateTime.toISOString(),
  }));
}

// Retrieves all orders
export async function getAllOrders() {
  await connectToDatabase();
  const orders = await Order.find().populate(
    "owner",
    "firstName lastName email"
  );
  return orders.map((order) => ({
    _id: order._id.toString(),
    id: order.id,
    orderDateTime: order.orderDateTime.toISOString(),
    status: order.status,
    type: order.type,
    cleaningType: order.cleaningType,
    price: order.price,
    owner: order.owner
      ? {
          _id: order.owner._id.toString(),
          name: order.owner.firstName + " " + order.owner.lastName,
          email: order.owner.email,
        }
      : null,
  }));
}

// Retrieves orders by Clerk ID
export async function getOrders(clerkId: string) {
  await connectToDatabase();
  const user = await User.findOne({ clerkId });
  if (!user) throw new Error(`User not found for clerkId: ${clerkId}`);
  const orders = await Order.find({ userId: user._id });
  return orders.map((order) => order.toObject());
}

// Updates the status of an order
export async function updateOrderStatus(
  orderId: string,
  newStatus: string
): Promise<{ status: string } | null> {
  await connectToDatabase();
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { status: newStatus },
    { new: true, lean: true }
  )
    .lean<{ status: string } | null>()
    .exec();

  return updatedOrder ? { status: updatedOrder.status } : null;
}
