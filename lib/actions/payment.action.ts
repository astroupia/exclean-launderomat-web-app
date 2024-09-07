"use server";

import { connectToDatabase } from "@/utils/database";
import Payment from "@/models/payment";
import { uploadImage } from "@/lib/actions/image.action";

export async function getAllPayments() {
  try {
    await connectToDatabase();

    const payments = await Payment.find()
      .populate("payer", "name email")
      .populate("order", "orderNumber")
      .sort({ payedDateTime: -1 });

    return payments;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
}

export async function createPayment(paymentData: {
  id: string;
  amount: number;
  imageUrl: string;
  status: "Pending" | "Approved" | "Rejected";
  payer: string;
  order: string;
}) {
  try {
    await connectToDatabase();

    const newPayment = await Payment.create(paymentData);
    return newPayment;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
}

export async function updatePaymentStatus(
  paymentId: string,
  status: "Pending" | "Approved" | "Rejected"
) {
  try {
    await connectToDatabase();

    const updatedPayment = await Payment.findOneAndUpdate(
      { id: paymentId },
      { status },
      { new: true }
    );

    return updatedPayment;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
}

export async function getPaymentById(paymentId: string) {
  try {
    await connectToDatabase();

    const payment = await Payment.findOne({ id: paymentId })
      .populate("payer", "name email")
      .populate("order", "orderNumber");

    return payment;
  } catch (error) {
    console.error("Error fetching payment:", error);
    throw error;
  }
}

export async function uploadPayment(paymentData: {
  amount: number;
  payerUserId: string;
  orderId: string;
  image: File;
}) {
  try {
    await connectToDatabase();

    // Upload the image using Uploadthing
    const imageUrl = await uploadImage(paymentData.image);

    // Generate a unique ID for the payment
    const paymentId = `PAY-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Create the payment object
    const newPayment = await Payment.create({
      id: paymentId,
      amount: paymentData.amount,
      imageUrl: imageUrl,
      status: "Pending",
      payer: paymentData.payerUserId,
      order: paymentData.orderId,
    });

    // Populate payer and order information
    await newPayment.populate("payer", "name email");
    await newPayment.populate("order", "orderNumber");

    return newPayment;
  } catch (error) {
    console.error("Error uploading payment:", error);
    throw error;
  }
}

export async function updatePayment(
  paymentId: string,
  updateData: { status: "Pending" | "Approved" | "Rejected" }
) {
  try {
    await connectToDatabase();

    const updatedPayment = await Payment.findOneAndUpdate(
      { id: paymentId },
      updateData,
      { new: true }
    )
      .populate("payer", "name email")
      .populate("order", "orderNumber");

    return updatedPayment;
  } catch (error) {
    console.error("Error updating payment:", error);
    throw error;
  }
}
