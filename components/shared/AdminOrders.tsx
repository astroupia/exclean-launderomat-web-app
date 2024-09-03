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
import { CreateOrderParams } from "@/types"; // Importing the types for orders

// AdminOrders component is a functional React component that takes in an array of orders as a prop
const AdminOrders: React.FC<{ orders: CreateOrderParams[] }> = ({ orders }) => {
  return (
    // The main Card component wraps the entire content of the orders table
    <Card className="w-full">
      {/* CardHeader contains the title of the card */}
      <CardHeader>
        <CardTitle>Orders</CardTitle>
      </CardHeader>
      {/* CardContent contains the main content, which is a table in this case */}
      <CardContent>
        <Table>
          <TableHeader>
            {/* TableRow defines a row in the table header */}
            <TableRow>
              {/* TableHead defines each header cell */}
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
            {/* Mapping over orders to generate a table row for each order */}
            {orders.map((order) => (
              <TableRow key={order.order.id}>
                {/* TableCell defines each cell in a row */}
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
                  {/* Badge component displays the status with different variants */}
                  <Badge
                    variant={
                      order.order.status === "Pending" ? "warning" : "success"
                    }
                  >
                    {order.order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {/* Badge component displays the payment status with different variants */}
                  <Badge variant="info">{order.order.price}</Badge>
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
