import React from "react";
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

interface CustomerOrderPreviewProps {
  order?: {
    id: string;
    orderDateTime: Date;
    status: "Pending" | "In Progress" | "Completed" | "Cancelled";
    type: string;
    cleaningType: string;
    price: number;
  };
  onViewDetails: (orderId: string) => void;
}

const CustomerOrderPreview: React.FC<CustomerOrderPreviewProps> = ({
  order,
  onViewDetails,
}) => {
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

  if (!order) {
    return (
      <Card className="mb-4">
        <CardContent>No order data available</CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <CardHeader>Order Preview</CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableCell>{order.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableCell>{order.orderDateTime.toLocaleDateString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableCell>
                <Badge variant={getBadgeVariant(order.status)}>
                  {order.status}
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableCell>{order.type}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Cleaning Type</TableHead>
              <TableCell>{order.cleaningType}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Price</TableHead>
              <TableCell>${order.price.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="mt-4 text-right">
          <Button onClick={() => onViewDetails(order.id)}>View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerOrderPreview;
