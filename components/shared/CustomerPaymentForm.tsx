import Button from "@/components/ui/Button"; // Importing the Button component for approval actions
import { PaymentParam } from "@/types"; // Importing the type definition for payments
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import React, { useState } from "react";

function CustomerPaymentForm({
  handlePaymentUpload,
}: {
  handlePaymentUpload: (payment: PaymentParam) => void;
}) {
  // State to handle form input values
  const [method, setMethod] = useState<string>("Credit Card");
  const [amount, setAmount] = useState<number>(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Payment</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Form submission logic */}
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            // Constructing the payment object based on form inputs
            const payment: PaymentParam = {
              id: Date.now(), // Use a better ID generation method in production
              customer: "John Doe", // Replace with dynamic customer data in real scenarios
              amount,
              method,
              status: "Pending",
            };

            handlePaymentUpload(payment);
          }}
        >
          <div className="grid gap-4">
            {/* Form Fields */}

            {/* Payment Method Select */}
            <Label htmlFor="payment-method">Payment Method</Label>
            <select
              id="payment-method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              required
              className="p-2 border rounded"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>

            {/* Payment Amount Input */}
            <Label htmlFor="payment-amount">Amount</Label>
            <Input
              type="number"
              id="payment-amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />

            {/* Submit Button */}
            <Button content="Upload Payment" type="submit" className="w-full" />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default CustomerPaymentForm;
