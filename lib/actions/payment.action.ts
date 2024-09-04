"use server";

import { connectToDatabase } from "@/utils/database";
import { PaymentParam } from "@/types";
import Payment from "@/models/payment"; // Assuming you have a Payment model

export async function getAllPayments(): Promise<PaymentParam[]> {
  try {
    await connectToDatabase();
    const payments = await Payment.find().populate("orderId");
    return JSON.parse(JSON.stringify(payments));
  } catch (error) {
    console.error("Error getting all payments:", error);
    throw new Error("Failed to get payments");
  }
}

export async function updatePayment(
  id: string,
  updateData: Partial<PaymentParam>
) {
  try {
    await connectToDatabase();
    const updatedPayment = await Payment.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedPayment) {
      throw new Error("Payment not found");
    }
    return JSON.parse(JSON.stringify(updatedPayment));
  } catch (error) {
    console.error("Error updating payment:", error);
    throw new Error("Failed to update payment");
  }
}
