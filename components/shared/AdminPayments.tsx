"use client";

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
import { useState } from "react";

const AdminPayments: React.FC = () => {
  const [payments, setPayments] = useState<PaymentParam[]>([
    {
      id: 1,
      customer: "Nahom",
      amount: 200.0,
      method: "Upload",
      status: "Pending",
    },
  ]);

  const handlePaymentApproval = (paymentId: number) => {
    setPayments(
      payments.map((payment: PaymentParam) =>
        payment.id === paymentId ? { ...payment, status: "Approved" } : payment
      )
    );
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
              <TableHead>Payment ID</TableHead>
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
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.customer}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      payment.status === "Pending"
                        ? "warning"
                        : payment.status === "Approved"
                        ? "info"
                        : "success"
                    }
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {payment.status === "Pending" && (
                    <Button
                      onClick={() => handlePaymentApproval(payment.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Approve
                    </Button>
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
