"use client";

import React, { useState, useEffect } from "react";
import "./view.css";
import SideButton, { SideButtonProps } from "@/components/shared/SideButton";
import Order from "@/public/assets/icons/order.png";
import Payment from "@/public/assets/icons/payment.png";
import Inventory from "@/public/assets/icons/product.png";
import { CreateOrderParams, Order as OrderType } from "@/types";
import { getUserRole } from "@/lib/actions/user.action"; // Import the function to fetch user role
import { useAuth, useUser } from "@clerk/nextjs";
import { createOrder } from "@/lib/actions/order.action";
import CustomerOrderForm from "@/components/shared/CustomerOrderForm";
import AdminOrders from "@/components/shared/AdminOrders"; // Add this import
import AdminInventory from "@/components/shared/AdminInventory"; // Add this import
import AdminPayments from "@/components/shared/AdminPayments"; // Add this import

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
  {
    name: "Payment",
    iconUrl: Payment,
    variant: "not-selected",
  },
  {
    name: "Inventory",
    iconUrl: Inventory,
    variant: "not-selected",
  },
];

const Dashboard: React.FC = () => {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();

  const [view, setView] = useState<"customer" | "admin">("customer");
  const [selectedBar, setSelectedBar] = useState<string>("Order");
  const [orders, setOrders] = useState<CreateOrderParams[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Use useEffect to handle any client-side only logic
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

  // Render a loading state while waiting for auth to load
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

  const handleToggleClick = (name: string) => {
    setSelectedBar(name);
  };

  // Use optional chaining to safely access user properties
  const userName = user?.firstName || "User";

  return (
    <>
      <h1 className="word text-indigo-600 font-bold text-2xl">
        {userName}'s Dashboard
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
            {selectedBar === "Order" && view === "admin" && <AdminOrders />}
            {selectedBar === "Payment" && view === "admin" && <AdminPayments />}
            {selectedBar === "Inventory" && view === "admin" && (
              <AdminInventory />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
