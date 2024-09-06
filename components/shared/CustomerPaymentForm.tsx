import React, { useState } from "react";
import { PaymentParam } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface CustomerPaymentFormProps {
  handlePaymentUpload: (payment: PaymentParam) => void;
}

const CustomerPaymentForm: React.FC<CustomerPaymentFormProps> = ({
  handlePaymentUpload,
}) => {
  const [method, setMethod] = useState<string>("Credit Card");
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payment: PaymentParam = {
      id: Date.now().toString(), // Convert to string
      customer: "John Doe", // Replace with dynamic customer data in real scenarios
      amount,
      method,
      orderId: "", // Add a placeholder for orderId
      bankStatementUrl: "", // Add a placeholder for bankStatementUrl
      status: "Pending",
    };
    handlePaymentUpload(payment);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      {" "}
      {/* Center the card on larger screens */}
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Upload Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="payment-method" className="text-sm font-medium">
              Payment Method
            </Label>
            <Select
              items={[
                { value: "Credit Card", label: "Credit Card" },
                { value: "PayPal", label: "PayPal" },
                { value: "Bank Transfer", label: "Bank Transfer" },
              ]}
              onChange={(value) => setMethod(value)}
              placeholder="Select payment method"
            />
          </div>
          <div>
            <Label htmlFor="payment-amount" className="text-sm font-medium">
              Amount
            </Label>
            <Input
              type="number"
              id="payment-amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Upload Payment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomerPaymentForm;
