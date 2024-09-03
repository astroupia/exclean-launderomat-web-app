"use client";

import React, { useState, useEffect } from "react";
import { CreateOrderParams } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface CustomerOrderFormProps {
  handleOrderRequest: (order: CreateOrderParams) => void;
}

const CustomerOrderForm: React.FC<CustomerOrderFormProps> = ({
  handleOrderRequest,
}) => {
  const [orderType, setOrderType] = useState<string>("");
  const [cleaningType, setCleaningType] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { userId } = useAuth();

  const calculatePrice = (type: string, cleaningType: string) => {
    let basePrice = 0;
    switch (type) {
      case "Shirt":
        basePrice = 10;
        break;
      case "Jeans":
        basePrice = 20;
        break;
      case "Blouse":
        basePrice = 15;
        break;
      case "Suit":
        basePrice = 30;
        break;
      case "Dress":
        basePrice = 25;
        break;
      case "Shoes":
        basePrice = 12;
        break;
      case "Trouser":
        basePrice = 18;
        break;
      case "Sweater":
        basePrice = 22;
        break;
      default:
        basePrice = 0;
        break;
    }

    let cleaningPrice = cleaningType === "Dry" ? 5 : 10;

    return basePrice + cleaningPrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!orderType || !cleaningType || price <= 0) {
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
        type: orderType,
        cleaningType,
        price: calculatePrice(orderType, cleaningType),
        owner: userId || "",
      },
    };

    try {
      await handleOrderRequest(order);
      alert("Order created successfully!");
      // Reset form
      setOrderType("");
      setCleaningType("");
    } catch (error) {
      console.error("Failed to handle order request:", error);
      alert("Failed to process order. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Recalculate price whenever orderType or cleaningType changes
    setPrice(calculatePrice(orderType, cleaningType));
  }, [orderType, cleaningType]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Place an Order</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="orderType" className="text-sm font-medium">
              Order Type
            </Label>
            <Select
              items={[
                { value: "Shirt", label: "Shirt" },
                { value: "Blouse", label: "Blouse" },
                { value: "Jeans", label: "Jeans" },
                { value: "Suit", label: "Suit" },
                { value: "Dress", label: "Dress" },
                { value: "Shoes", label: "Shoes" },
                { value: "Trouser", label: "Trouser" },
                { value: "Sweater", label: "Sweater" },
              ]}
              onChange={(value) => setOrderType(value as string)}
              placeholder="Select order type"
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
              onChange={(value) => setCleaningType(value)}
              placeholder="Select cleaning type"
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
              <Badge variant="info">Estimate</Badge>
            </div>
          </div>
        </form>
      </CardContent>
      <div className="p-6 pt-0">
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || !orderType || !cleaningType}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Processing..." : "Submit Order"}
        </Button>
      </div>
    </Card>
  );
};

export default CustomerOrderForm;
