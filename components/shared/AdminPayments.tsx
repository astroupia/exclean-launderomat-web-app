"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge"; // Importing the Badge component for status indicators
import Button from "@/components/ui/Button"; // Importing the Button component for approval actions
import { PaymentParam } from "@/types"; // Importing the type definition for payments
import Image from "next/image";
import { updateOrder } from "@/lib/actions/order.action";
import { getAllPayments, updatePayment } from "@/lib/actions/payment.action";

const AdminPayments: React.FC = () => {
  const [payments, setPayments] = useState<PaymentParam[]>([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const fetchedPayments = await getAllPayments();
      setPayments(fetchedPayments);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    }
  };

  const handlePaymentDecision = async (
    paymentId: string,
    decision: "Approved" | "Rejected"
  ) => {
    try {
      // Update payment status
      await updatePayment(paymentId, { status: decision });

      // Find the payment and corresponding order
      const payment = payments.find((p) => p.id === paymentId);
      if (!payment) {
        throw new Error("Payment not found");
      }

      // Update order status based on payment decision
      const newOrderStatus =
        decision === "Approved" ? "Completed" : "Cancelled";
      await updateOrder(payment.orderId, { status: newOrderStatus });

      // Refresh payments list
      fetchPayments();
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <Card className="w-full">
      {/* CardHeader for the title of the payment management section */}
      <CardHeader>
        <CardTitle>Payment Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {/* Table headers for the payments table */}

              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>

              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Mapping through the payments array to create rows for each payment */}
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.customer}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>Bank Transaction</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      payment.status === "Pending"
                        ? "warning"
                        : payment.status === "Approved"
                        ? "success"
                        : "destructive"
                    }
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
                {/* <TableCell>
                  {payment.bankStatementUrl && (
                    <Image
                      src={payment.bankStatementUrl}
                      alt="Bank Statement"
                      width={100}
                      height={100}
                      className="cursor-pointer"
                      onClick={() =>
                        window.open(payment.bankStatementUrl, "_blank")
                      }
                    />
                  )}
                </TableCell> */}
                <TableCell>
                  {payment.status === "Pending" && (
                    <>
                      <Button
                        onClick={() =>
                          handlePaymentDecision(payment.id, "Approved")
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() =>
                          handlePaymentDecision(payment.id, "Rejected")
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminPayments;
