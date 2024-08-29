import Order from "@/models/order";
import { CreateOrderParams } from "@/types";
import { connectToDatabase } from "@/utils/database";
import { handleError } from "../utils";

export async function createOrder(order: CreateOrderParams) {
  try {
    await connectToDatabase();

    const newOrder = await Order.create(order);
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}
