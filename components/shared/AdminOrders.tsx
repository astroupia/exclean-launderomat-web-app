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
import { OrderParam } from "@/types"; // Importing the types for orders

// AdminOrders component is a functional React component that takes in an array of orders as a prop
const AdminOrders: React.FC<{ orders: OrderParam[] }> = ({ orders }) => {
  return (
    // The main Card component wraps the entire content of the orders table
    <Card>
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
              <TableRow key={order.id}>
                {/* TableCell defines each cell in a row */}
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.time}</TableCell>
                <TableCell>{order.frequency}</TableCell>
                <TableCell>
                  {/* Badge component displays the status with different variants */}
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
                  {/* Badge component displays the payment status with different variants */}
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
};

export default AdminOrders;
