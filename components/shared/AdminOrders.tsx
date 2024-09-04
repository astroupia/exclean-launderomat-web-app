import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { CreateOrderParams } from "@/types";
import { getAllOrders, updateOrder } from "@/lib/actions/order.action";

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<CreateOrderParams[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const allOrders = await getAllOrders();
      setOrders(allOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusUpdate = async (
    orderId: string,
    newStatus: "Pending" | "In Progress" | "Completed" | "Cancelled"
  ) => {
    try {
      await updateOrder(orderId, { status: newStatus });
      fetchOrders(); // Refresh the orders after update
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <Card className="w-full">
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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.order.id}>
                <TableCell>{order.order.id}</TableCell>
                <TableCell>{order.userId}</TableCell>
                <TableCell>
                  {new Date(order.order.orderDateTime).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(order.order.orderDateTime).toLocaleTimeString()}
                </TableCell>
                <TableCell>{order.order.type}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.order.status === "Pending" ? "warning" : "success"
                    }
                  >
                    {order.order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="info">{order.order.price}</Badge>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      handleStatusUpdate(order.order.id, "In Progress")
                    }
                    disabled={order.order.status !== "Pending"}
                  >
                    Start
                  </Button>
                  <Button
                    onClick={() =>
                      handleStatusUpdate(order.order.id, "Completed")
                    }
                    disabled={order.order.status !== "In Progress"}
                  >
                    Complete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrders;
