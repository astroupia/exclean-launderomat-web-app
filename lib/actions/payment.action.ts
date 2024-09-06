"use server";

import { connectToDatabase } from "@/utils/database";
import { PaymentParam } from "@/types";
import Payment from "@/models/payment"; // Assuming you have a Payment model
import { Payment as PaymentType } from "@/types";

const mapToPaymentParam = (doc: any): PaymentParam => ({
  id: doc.id,
  orderId: doc.orderId,
  customer: doc.customer,
  amount: doc.amount,
  method: doc.method,
  status: doc.status,
  bankStatementUrl: doc.bankStatementUrl,
});

// Retrieves all payments
export async function getAllPayments(): Promise<PaymentParam[]> {
  await connectToDatabase();
  const payments = await Payment.find().populate("orderId").lean();
  return payments.map(mapToPaymentParam);
}

// Updates a payment
export async function updatePayment(
  id: string,
  updateData: Partial<PaymentParam>
): Promise<PaymentParam> {
  await connectToDatabase();
  const updatedPayment = await Payment.findByIdAndUpdate(id, updateData, {
    new: true,
    lean: true,
  });
  if (!updatedPayment) throw new Error("Payment not found");
  return mapToPaymentParam(updatedPayment);
}

// Retrieves a payment by ID
export async function getPaymentById(id: string): Promise<PaymentParam | null> {
  await connectToDatabase();
  const payment = await Payment.findById(id).populate("orderId").lean();
  return payment ? mapToPaymentParam(payment) : null;
}

// Creates a new payment
export async function createPayment(
  paymentData: Omit<PaymentParam, "id">
): Promise<PaymentParam> {
  await connectToDatabase();
  const newPayment = new Payment({ ...paymentData, id: `pay_${Date.now()}` });
  const savedPayment = await newPayment.save();
  return mapToPaymentParam(savedPayment.toObject());
}

// Deletes a payment by ID
export async function deletePaymentById(
  id: string
): Promise<{ message: string }> {
  await connectToDatabase();
  const result = await Payment.findByIdAndDelete(id);
  if (!result) throw new Error("Payment not found");
  return { message: "Payment deleted successfully" };
}

export async function uploadPayment(
  payment: PaymentParam
): Promise<PaymentParam> {
  await connectToDatabase();
  const newPayment = new Payment(payment);
  const savedPayment = await newPayment.save();
  return mapToPaymentParam(savedPayment.toObject());
}
