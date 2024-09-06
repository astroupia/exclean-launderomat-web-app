import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { CardHeader } from "@/components/ui/Card";
import { CardTitle } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/Card";
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
  firstName: string;
  orderDateTime: string;
  type: string;
  status: string;
  price: number;
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
    <Card className="w-full overflow-x-auto">
      {" "}
      {/* Add overflow-x-auto */}
      <CardHeader>
        <CardTitle>Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-2 py-1">ID</TableHead>{" "}
              {/* Reduce padding */}
              <TableHead className="px-2 py-1">Customer</TableHead>
              <TableHead className="px-2 py-1">Date</TableHead>
              <TableHead className="px-2 py-1">Type</TableHead>
              <TableHead className="px-2 py-1">Status</TableHead>
              <TableHead className="px-2 py-1">Payment</TableHead>
              <TableHead className="px-2 py-1">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="px-2 py-1">
                  {order.id.slice(-4)}
                </TableCell>{" "}
                {/* Show only last 4 characters */}
                <TableCell className="px-2 py-1">{order.firstName}</TableCell>
                <TableCell className="px-2 py-1">
                  {new Date(order.orderDateTime).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-2 py-1">{order.type}</TableCell>
                <TableCell className="px-2 py-1">
                  <Badge
                    variant={order.status === "Pending" ? "warning" : "success"}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-2 py-1">
                  <Badge variant="info">{order.price}.00</Badge>
                </TableCell>
                <TableCell className="px-2 py-1">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={() =>
                        handleStatusUpdate(order.id, "In Progress")
                      }
                      disabled={order.status !== "In Progress"}
                      className="text-xs px-2 py-1"
                    >
                      Start
                    </Button>
                    <Button
                      onClick={() => handleStatusUpdate(order.id, "Completed")}
                      disabled={order.status !== "Completed"}
                      className="text-xs px-2 py-1"
                    >
                      Complete
                    </Button>
                  </div>
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
