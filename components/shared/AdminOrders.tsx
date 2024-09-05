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
import { getAllOrders, updateOrder } from "@/lib/actions/order.action";

interface Order {
  id: string;
  userId: string;
  firstName: string; // Add this line
  orderDateTime: string;
  type: string;
  status: string;
  price: number;
  // Add other fields as necessary
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const allOrders = await getAllOrders();
      setOrders(allOrders as unknown as Order[]);
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
              {/* <TableHead>Time</TableHead> */}
              <TableHead>Frequency</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.firstName}</TableCell>
                <TableCell>
                  {new Date(order.orderDateTime).toLocaleDateString()}
                </TableCell>
                {/* <TableCell>
                  {new Date(order.orderDateTime).toLocaleTimeString()}
                </TableCell> */}
                <TableCell>{order.type}</TableCell>
                <TableCell>
                  <Badge
                    variant={order.status === "Pending" ? "warning" : "success"}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="info">{order.price}</Badge>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleStatusUpdate(order.id, "In Progress")}
                    disabled={order.status !== "Pending"}
                  >
                    Start
                  </Button>
                  <Button
                    onClick={() => handleStatusUpdate(order.id, "Completed")}
                    disabled={order.status !== "In Progress"}
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
