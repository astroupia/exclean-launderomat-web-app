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

// AdminPayments component for managing payment records
function AdminPayments({
  payments, // Array of payment records passed as a prop
  handlePaymentApproval, // Function to handle payment approval passed as a prop
}: {
  payments: PaymentParam[]; // Type definition for the payments array
  handlePaymentApproval: (paymentId: number) => void; // Type definition for the payment approval function
}) {
  return (
    <Card>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Mapping through the payments array to create rows for each payment */}
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
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
                {payment.status === "Pending" && (
                  <TableCell>
                    {/* Button to approve pending payments */}
                    <Button
                      content="Approve"
                      variant="secondary"
                      onClick={() => handlePaymentApproval(payment.id)}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminPayments;
