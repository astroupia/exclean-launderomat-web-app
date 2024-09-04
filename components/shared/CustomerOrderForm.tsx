"use client";

import React, { useState, useEffect } from "react";
import { CreateOrderParams } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Select, MultiSelect, SelectItem } from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface CustomerOrderFormProps {
  handleOrderRequest: (order: CreateOrderParams) => Promise<void>;
}

const CustomerOrderForm: React.FC<CustomerOrderFormProps> = ({
  handleOrderRequest,
}) => {
  const [orderTypes, setOrderTypes] = useState<string[]>([]);
  const [cleaningType, setCleaningType] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { userId } = useAuth();

  const calculatePrice = (types: string[], cleaningType: string) => {
    const basePrices: { [key: string]: number } = {
      Shirt: 10,
      Jeans: 20,
      Blouse: 15,
      Suit: 30,
      Dress: 25,
      Shoes: 12,
      Trouser: 18,
      Sweater: 22,
    };

    const totalBasePrice = types.reduce(
      (sum, type) => sum + (basePrices[type] || 0),
      0
    );
    const cleaningPrice = cleaningType === "Dry" ? 5 : 10;

    return totalBasePrice + cleaningPrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (orderTypes.length === 0 || !cleaningType || price <= 0) {
      alert("Please complete all fields correctly.");
      setIsSubmitting(false);
      return;
    }

    const order: CreateOrderParams = {
      userId: userId || "",
      order: {
        id: new Date().toISOString(),
        orderDateTime: new Date(),
        status: "Pending",
        type: orderTypes, // Keep as array
        cleaningType: cleaningType as "Dry" | "Wet" | "Steam" | "Other",
        price: calculatePrice(orderTypes, cleaningType),
      },
    };

    try {
      await handleOrderRequest(order);
      alert("Order created successfully!");
      // Reset form only on success
      setOrderTypes([]);
      setCleaningType("");
    } catch (error) {
      console.error("Failed to handle order request:", error);
      alert("Failed to process order. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setPrice(calculatePrice(orderTypes, cleaningType));
  }, [orderTypes, cleaningType]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Place an Order</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="orderTypes" className="text-sm font-medium">
              Order Types
            </Label>
            <MultiSelect
              options={[
                { value: "Shirt", label: "Shirt" },
                { value: "Blouse", label: "Blouse" },
                { value: "Jeans", label: "Jeans" },
                { value: "Suit", label: "Suit" },
                { value: "Dress", label: "Dress" },
                { value: "Shoes", label: "Shoes" },
                { value: "Trouser", label: "Trouser" },
                { value: "Sweater", label: "Sweater" },
              ]}
              onChange={(values: string[]) => setOrderTypes(values)}
              value={orderTypes}
              placeholder="Select order types"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="cleaningType"
              className="text-indigo-600 text-sm font-medium"
            >
              Cleaning Type
            </Label>
            <Select
              items={[
                { value: "Dry", label: "Dry" },
                { value: "Wet", label: "Wet" },
              ]}
              placeholder="Select cleaning type"
              onChange={(value: string) => setCleaningType(value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Estimated Price
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                id="price"
                value={`$${price.toFixed(2)}`}
                readOnly
                className="w-full bg-gray-100"
              />
              <Badge variant="info">Estimated</Badge>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || orderTypes.length === 0 || !cleaningType}
          >
            {isSubmitting ? "Processing..." : "Submit Order"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomerOrderForm;
