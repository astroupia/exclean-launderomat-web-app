import React, { useState } from "react";
import { PaymentParam } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core"; // Make sure this path is correct

interface CustomerPaymentFormProps {
  handlePaymentUpload: (payment: PaymentParam, file: File) => void;
}

const CustomerPaymentForm: React.FC<CustomerPaymentFormProps> = ({
  handlePaymentUpload,
}) => {
  const [method, setMethod] = useState<string>("Credit Card");
  const [amount, setAmount] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload an image of your payment");
      return;
    }
    const payment: PaymentParam = {
      id: Date.now().toString(),
      customer: "John Doe", // Replace with dynamic customer data in real scenarios
      amount,
      method,
      orderId: "", // Add a placeholder for orderId
      bankStatementUrl: "", // This will be replaced by the uploaded image URL
      status: "Pending",
    };
    handlePaymentUpload(payment, file);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
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
                { value: "CBE Birr", label: "CBE Birr" },
                { value: "Tele Birr", label: "Tele Birr" },
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
          <div>
            <Label className="text-sm font-medium">Upload Payment Image</Label>
            <UploadDropzone<OurFileRouter, "imageUploader">  {/* Use "imageUploader" */}
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res && res.length > 0) {
                  setFile(new File([res[0].url], res[0].name, { type: res[0].type }));
                  alert("Upload Completed");
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
          <Button type="submit" className="w-full" disabled={!file}>
            Upload Payment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomerPaymentForm;
