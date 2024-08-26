"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const [view, setView] = useState("customer");
  const [userRole, setUserRole] = useState("customer");
  const [orders, setOrders] = useState([
    {
      id: 1,
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
    },
    {
      id: 2,
      customer: "Jane Smith",
      date: "2023-06-08",
      time: "2:00 PM",
      frequency: "Bi-weekly",
      status: "Scheduled",
      payment: {
        method: "PayPal",
        amount: 75,
        status: "Approved",
      },
    },
    {
      id: 3,
      customer: "Michael Johnson",
      date: "2023-06-15",
      time: "11:00 AM",
      frequency: "Monthly",
      status: "Completed",
      payment: {
        method: "Credit Card",
        amount: 100,
        status: "Paid",
      },
    },
  ]);
  const [inventory, setInventory] = useState([
    {
      id: 1,
      item: "Vacuum Cleaner",
      quantity: 10,
    },
    {
      id: 2,
      item: "Mop",
      quantity: 15,
    },
    {
      id: 3,
      item: "Cleaning Supplies",
      quantity: 50,
    },
  ]);
  const [payments, setPayments] = useState([
    {
      id: 1,
      customer: "John Doe",
      amount: 50,
      method: "Credit Card",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Jane Smith",
      amount: 75,
      method: "PayPal",
      status: "Approved",
    },
    {
      id: 3,
      customer: "Michael Johnson",
      amount: 100,
      method: "Credit Card",
      status: "Paid",
    },
  ]);
  const handleOrderRequest = (order) => {
    setOrders([...orders, order]);
  };
  const handlePaymentUpload = (payment) => {
    setPayments([...payments, payment]);
  };
  const handlePaymentApproval = (paymentId) => {
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId ? { ...payment, status: "Approved" } : payment
      )
    );
  };
  const handleInventoryUpdate = (item, quantity) => {
    setInventory(
      inventory.map((i) => (i.id === item.id ? { ...i, quantity } : i))
    );
  };
  useEffect(() => {
    const userRole = "admin";
    setUserRole(userRole);
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Cleaning Dashboard</h1>
          {userRole === "admin" ? (
            <div className="flex gap-4">
              <Button
                variant={view === "customer" ? "primary" : "outline"}
                onClick={() => setView("customer")}
              >
                Customer
              </Button>
              <Button
                variant={view === "admin" ? "primary" : "outline"}
                onClick={() => setView("admin")}
              >
                Admin
              </Button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button>Order Cleaning</Button>
              <Button variant="outline">Upload Payment</Button>
            </div>
          )}
        </div>
      </header>
      {userRole === "customer" && (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Cleaning Service</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const order = {
                    id: orders.length + 1,
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
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input type="date" id="date" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input type="time" id="time" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select id="frequency" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea id="notes" rows={3} />
                  </div>
                  <Button type="submit" className="w-full">
                    Request Cleaning
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upload Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const payment = {
                    id: payments.length + 1,
                    customer: "John Doe",
                    amount: 50,
                    method: "Credit Card",
                    status: "Pending",
                  };
                  handlePaymentUpload(payment);
                }}
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Select id="payment-method" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit-card">Credit Card</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="payment-amount">Amount</Label>
                    <Input type="number" id="payment-amount" required />
                  </div>
                  <Button type="submit" className="w-full">
                    Upload Payment
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
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
        </div>
      )}
      {userRole === "admin" && (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
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
                      <TableCell>{order.customer}</TableCell>
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
          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Update</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.item}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          defaultValue={item.quantity}
                          onBlur={(e) =>
                            handleInventoryUpdate(item, e.target.value)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.customer}</TableCell>
                      <TableCell>${payment.amount}</TableCell>
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
        </div>
      )}
    </div>
  );
}
