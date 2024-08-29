"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { PaymentParam, InventoryItemParam, OrderParam } from "@/types";
import AdminOrders from "@/components/shared/AdminOrders";
import AdminInventory from "@/components/shared/AdminInventory";
import AdminPayments from "@/components/shared/AdminPayments";

export default function Dashboard() {
  const [view, setView] = useState<"customer" | "admin">("admin");
  const [userRole, setUserRole] = useState<"customer" | "admin">("customer");
  const [orders, setOrders] = useState<OrderParam[]>([
    // Sample orders
  ]);
  const [inventory, setInventory] = useState<InventoryItemParam[]>([
    { id: 1, item: "string", quantity: 10 },
  ]);
  const [payments, setPayments] = useState<PaymentParam[]>([
    {
      id: 1,
      customer: "Nahom",
      amount: 200.0,
      method: "Upload",
      status: "approved",
    },
  ]);

  const handleOrderRequest = (order: OrderParam) => {
    setOrders([...orders, order]);
  };

  const handlePaymentUpload = (payment: PaymentParam) => {
    setPayments([...payments, payment]);
  };

  const handlePaymentApproval = (paymentId: number) => {
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId ? { ...payment, status: "Approved" } : payment
      )
    );
  };

  const handleInventoryUpdate = (
    item: InventoryItemParam,
    quantity: number
  ) => {
    setInventory(
      inventory.map((i) => (i.id === item.id ? { ...i, quantity } : i))
    );
  };

  useEffect(() => {
    // Simulating role assignment; replace with actual logic
    setUserRole("admin");
  }, []);

  return (
    <section className="bg-indigo mx-20">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {/* {userRole === "admin" ? (
              <div className="mx-20 flex gap-4">
                <Button
                  content="Customer"
                  variant={view === "customer" ? "primary" : "outline"}
                  onClick={() => setView("customer")}
                />
                <Button
                  content="Admin"
                  variant={view === "admin" ? "primary" : "outline"}
                  onClick={() => setView("admin")}
                />
              </div>
            ) : (
              <div className="flex gap-4">
                <Button content="Order Cleaning" />
                <Button content="Upload Payment" />
              </div>
            )} */}
      </header>

      <div className="flex flex-col h-screen">
        {view === "customer" && userRole === "customer" && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Customer View Components */}
            <CustomerOrderForm handleOrderRequest={handleOrderRequest} />
            <CustomerPaymentForm handlePaymentUpload={handlePaymentUpload} />
            <CustomerOrderStatus orders={orders} />
          </div>
        )}

        {view === "admin" && userRole === "admin" && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {/* Admin View Components */}
            <div className="m-5 w-1/2">
              <AdminOrders orders={orders} />
            </div>
            <div className="m-5">
              <AdminInventory
                inventory={inventory}
                handleInventoryUpdate={handleInventoryUpdate}
              />{" "}
            </div>
            <div className="m-5">
              <AdminPayments
                payments={payments}
                handlePaymentApproval={handlePaymentApproval}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Separate customer and admin components for better maintainability

function CustomerOrderForm({
  handleOrderRequest,
}: {
  handleOrderRequest: (order: OrderParam) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Cleaning Service</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const order: OrderParam = {
              id: Date.now(), // Use a better ID in production
              customer: "John Doe",
              date: "2023-06-01",
              time: "9:00 AM",
              frequency: "Weekly",
              status: "Pending",
              payment: {
                method: "Credit Card",
                amount: 50,
                status: "Pending",
              },
            };
            handleOrderRequest(order);
          }}
        >
          <div className="grid gap-4">
            {/* Form Fields */}
            <Label htmlFor="date">Date</Label>
            <Input type="date" id="date" required />

            <Label htmlFor="time">Time</Label>
            <Input type="time" id="time" required />

            <Label htmlFor="frequency">Frequency</Label>
            {/* Add Select component for frequency */}

            <Label htmlFor="notes">Additional Notes</Label>
            {/* Add TextArea component */}

            <Button
              content="Request Cleaning"
              type="submit"
              className="w-full"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function CustomerPaymentForm({
  handlePaymentUpload,
}: {
  handlePaymentUpload: (payment: PaymentParam) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const payment: PaymentParam = {
              id: Date.now(), // Use a better ID in production
              customer: "John Doe",
              amount: 50,
              method: "Credit Card",
              status: "Pending",
            };
            handlePaymentUpload(payment);
          }}
        >
          <div className="grid gap-4">
            {/* Form Fields */}
            <Label htmlFor="payment-method">Payment Method</Label>
            {/* Add Select component for payment method */}

            <Label htmlFor="payment-amount">Amount</Label>
            <Input type="number" id="payment-amount" required />

            <Button content="Upload Payment" type="submit" className="w-full" />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function CustomerOrderStatus({ orders }: { orders: OrderParam[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Check Order Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.time}</TableCell>
                <TableCell>{order.frequency}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "Pending"
                        ? "warning"
                        : order.status === "Scheduled"
                        ? "info"
                        : "success"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.payment.status === "Pending"
                        ? "warning"
                        : order.payment.status === "Approved"
                        ? "info"
                        : "success"
                    }
                  >
                    {order.payment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
