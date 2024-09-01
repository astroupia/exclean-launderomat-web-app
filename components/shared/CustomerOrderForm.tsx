import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { OrderParam } from "@/types"; // Importing the types for orders
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import React, { useState } from "react";

function CustomerOrderForm({
  handleOrderRequest,
}: {
  handleOrderRequest: (order: OrderParam) => void;
}) {
  // State to handle form input values
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("Weekly");
  const [notes, setNotes] = useState<string>("");

  return (
    <Card className="bg-black">
      <CardHeader>
        <CardTitle>Order Cleaning Service</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Form submission logic */}
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            // Constructing the order object based on form inputs
            const order: OrderParam = {
              id: Date.now(), // Use a better ID generation method in production
              customer: "John Doe", // Replace with dynamic customer data in real scenarios
              date,
              time,
              frequency,
              status: "Pending",
              payment: {
                method: "Credit Card", // You can replace this with a dynamic input if needed
                amount: 50, // Replace with dynamic input or calculated value
                status: "Pending",
              },
            };

            handleOrderRequest(order);
          }}
        >
          <div className="grid gap-4">
            {/* Form Fields */}

            {/* Date Input */}
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            {/* Time Input */}
            <Label htmlFor="time">Time</Label>
            <Input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />

            {/* Frequency Select */}
            <Label htmlFor="frequency">Frequency</Label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              required
              className="p-2 border rounded"
            >
              <option value="Weekly">Weekly</option>
              <option value="Bi-weekly">Bi-weekly</option>
              <option value="Monthly">Monthly</option>
            </select>

            {/* Notes TextArea */}
            <Label htmlFor="notes">Additional Notes</Label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="p-2 border rounded"
              rows={4}
            />

            {/* Submit Button */}
            <Button
              content="Request Cleaning"
              type="submit"
              className="w-full"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default CustomerOrderForm;
