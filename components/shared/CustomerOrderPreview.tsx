import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import { getUserOrders } from "@/lib/actions/order.action";
import { useUser } from "@clerk/nextjs";

interface Order {
  _id: string;
  orderDateTime: string;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  type: string;
  cleaningType: string;
  price: number;
}

const CustomerOrderPreview: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const userOrders = await getUserOrders(user!.id);
      console.log("Fetched orders:", userOrders); // Add this line for debugging
      setOrders(userOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "In Progress":
        return "info";
      case "Completed":
        return "success";
      case "Cancelled":
        return "destructive";
      default:
        return "info";
    }
  };

  const handleViewDetails = (orderId: string) => {
    // Implement view details functionality
    console.log("View details for order:", orderId);
  };

  if (orders.length === 0) {
    return (
      <Card className="mb-4">
        <CardContent>No orders available</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="text-xl sm:text-2xl">Recent Orders</CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>
                    <Badge variant={getBadgeVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {Array.isArray(order.type)
                      ? order.type.join(", ")
                      : typeof order.type === "string"
                      ? order.type
                      : String(order.type)}
                  </TableCell>

                  <TableCell>${order.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerOrderPreview;
