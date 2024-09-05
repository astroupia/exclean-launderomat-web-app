"use server";

import { connectToDatabase } from "@/utils/database";
import { PaymentParam } from "@/types";
import Payment from "@/models/payment"; // Assuming you have a Payment model

const mapToPaymentParam = (doc: any): PaymentParam => ({
  id: doc.id,
  orderId: doc.orderId,
  customer: doc.customer,
  amount: doc.amount,
  method: doc.method,
  status: doc.status,
  bankStatementUrl: doc.bankStatementUrl,
});

export async function getAllPayments(): Promise<PaymentParam[]> {
  try {
    await connectToDatabase();
    const payments = await Payment.find().populate("orderId").lean();
    return payments.map(mapToPaymentParam);
  } catch (error) {
    console.error("Error getting all payments:", error);
    throw new Error("Failed to get payments");
  }
}

export async function updatePayment(
  id: string,
  updateData: Partial<PaymentParam>
): Promise<PaymentParam> {
  try {
    await connectToDatabase();
    const updatedPayment = await Payment.findByIdAndUpdate(id, updateData, {
      new: true,
      lean: true,
    });
    if (!updatedPayment) {
      throw new Error("Payment not found");
    }
    return mapToPaymentParam(updatedPayment);
  } catch (error) {
    console.error("Error updating payment:", error);
    throw new Error("Failed to update payment");
  }
}

export async function getPaymentById(id: string): Promise<PaymentParam | null> {
  try {
    await connectToDatabase();
    const payment = await Payment.findById(id).populate("orderId").lean();
    return payment ? mapToPaymentParam(payment) : null;
  } catch (error) {
    console.error("Error getting payment:", error);
    throw new Error("Failed to get payment");
  }
}

export async function createPayment(
  paymentData: Omit<PaymentParam, "id">
): Promise<PaymentParam> {
  try {
    await connectToDatabase();
    const newPayment = new Payment({
      ...paymentData,
      id: `pay_${Date.now()}`,
    });
    const savedPayment = await newPayment.save();
    return mapToPaymentParam(savedPayment.toObject());
  } catch (error) {
    console.error("Error creating payment:", error);
    throw new Error("Failed to create payment");
  }
}

export async function deletePaymentById(
  id: string
): Promise<{ message: string }> {
  try {
    await connectToDatabase();
    const result = await Payment.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Payment not found");
    }
    return { message: "Payment deleted successfully" };
  } catch (error) {
    console.error("Error deleting payment:", error);
    throw new Error("Failed to delete payment");
  }
}
