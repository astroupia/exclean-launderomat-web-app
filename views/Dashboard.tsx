"use client";

import React, { useState, useEffect } from "react";
import "./view.css";
import SideButton, { SideButtonProps } from "@/components/shared/SideButton";
import Order from "@/public/assets/icons/order.png";
import Payment from "@/public/assets/icons/payment.png";
import { CreateOrderParams, Order as OrderType } from "@/types";
import { getUserRole } from "@/lib/actions/user.action"; // Import the function to fetch user role
import { useAuth, useUser } from "@clerk/nextjs";
import { createOrder } from "@/lib/actions/order.action";
import CustomerOrderForm from "@/components/shared/CustomerOrderForm";

// Array of side button data for customers
const customerButtons: SideButtonProps[] = [
  {
    name: "Order",
    iconUrl: Order,
    variant: "not-selected",
  },
  {
    name: "Payment",
    iconUrl: Payment,
    variant: "not-selected",
  },
];

// Array of side button data for admins
const adminButtons: SideButtonProps[] = [
  {
    name: "Order",
    iconUrl: Order,
    variant: "not-selected",
  },
];

export interface toggleData {
  id: string;
  name: string;
}

export const toggles: toggleData[] = [
  {
    id: "1",
    name: "Order",
  },
  {
    id: "2",
    name: "Payment",
  },
];

const Dashboard: React.FC = () => {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();

  const [view, setView] = useState<"customer" | "admin">("customer");
  const [selectedBar, setSelectedBar] = useState<string>("Order");
  const [orders, setOrders] = useState<CreateOrderParams[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserRole() {
      if (isLoaded && userId) {
        try {
          const role = await getUserRole(userId);
          setUserRole(role);
          setView(role === "admin" ? "admin" : "customer");
        } catch (error) {
          console.error("Failed to fetch user role:", error);
        }
      }
    }
    fetchUserRole();
  }, [isLoaded, userId]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleOrderRequest = async (order: CreateOrderParams) => {
    try {
      const createdOrder = await createOrder(order);
      setOrders((prevOrders) => [...prevOrders, createdOrder]);
      console.log("Order created successfully:", createdOrder);
    } catch (error: unknown) {
      console.error("Failed to create order:", error);
      if (error instanceof Error) {
        alert(`Failed to create order: ${error.message}`);
      } else {
        alert("Failed to create order: An unknown error occurred");
      }
    }
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const order: CreateOrderParams = {
      userId: userId || "",
      order: {
        id: new Date().toISOString(),
        orderDateTime: new Date(),
        status: "Pending",
        type: (formData.get("type") as string) || "",
        cleaningType: formData.get("cleaningType") as
          | "Dry"
          | "Wet"
          | "Steam"
          | "Other",
        price: parseFloat(formData.get("price") as string) || 0,
      },
    };
    await handleOrderRequest(order);
  };

  const handleToggleClick = (name: string) => {
    setSelectedBar(name);
  };

  return (
    <>
      <h1 className="word text-indigo-600 font-bold text-2xl">
        {user?.firstName || "User"}'s Dashboard
      </h1>
      <section className={`bg-black section`}>
        <div className="flex">
          <div className="button">
            {(view === "customer" ? customerButtons : adminButtons).map(
              (side, index) => (
                <SideButton
                  key={index}
                  name={side.name}
                  iconUrl={side.iconUrl}
                  variant={
                    selectedBar === side.name ? "selected" : "not-selected"
                  }
                  onClick={() => handleToggleClick(side.name)}
                />
              )
            )}
          </div>
          <div className="dashboard mx-8 p-4">
            {selectedBar === "Order" && view === "customer" && (
              <CustomerOrderForm
                handleOrderRequest={(order: CreateOrderParams) =>
                  handleOrderRequest(order)
                }
              />
            )}
            {selectedBar === "Payment" && view === "customer" && (
              <h1 className="text-indigo-600">Customer Payment</h1>
            )}
            {selectedBar === "Order" && view === "admin" && (
              <h1 className="text-indigo-600">Admin Order Management</h1>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
