"use client";

import { useState } from "react";
import "./view.css";
import AdminOrders from "@/components/shared/AdminOrders";
import AdminInventory from "@/components/shared/AdminInventory";
import AdminPayments from "@/components/shared/AdminPayments";
import CustomerOrderForm from "@/components/shared/CustomerOrderForm";
import SideButton, { SideButtonProps } from "@/components/shared/SideButton";
import Order from "@/public/assets/icons/order.png";
import Payment from "@/public/assets/icons/payment.png";
import { OrderParam } from "@/types"; // Importing the types for orders

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
  // State to determine if the view is for a customer or admin
  const [view, setView] = useState<"customer" | "admin">("customer");

  // State to manage the selected button and rendered content
  const [selectedBar, setSelectedBar] = useState<string>("Order");

  // State to manage orders
  const [orders, setOrders] = useState<OrderParam[]>([
    {
      id: 1,
      customer: "Nahom",
      date: "20 / 19 / 90",
      time: "2:30",
      status: "Ongoing",
      frequency: "Lots",
      payment: {
        method: "card",
        amount: 200.0,
        status: "Approved",
      },
    },
  ]);

  const handleOrderRequest = (order: OrderParam) => {
    setOrders([...orders, order]);
  };

  const handleToggleClick = (name: string) => {
    setSelectedBar(name);
  };

  return (
    <>
      <h1 className="word text-indigo-600 font-bold text-2xl">
        Name, Dashboard
      </h1>
      <section className={`section`}>
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
          <div className="dashboard mx-8 p-4 borde">
            {/* Conditionally render components based on selectedBar */}
            {selectedBar === "Order" && view === "customer" && (
              <CustomerOrderForm handleOrderRequest={handleOrderRequest} />
            )}
            {selectedBar === "Payment" && view === "customer" && (
              <h1 className="text-indigo-600">customer Payment</h1>
            )}
            {selectedBar === "Order" && view === "admin" && (
              <h1 className="text-indigo-600">admin order</h1>
            )}
            {selectedBar === "Payment" && view === "admin" && (
              <h2 className="text-indigo-600"> admin payment </h2>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;

{
  /* {view === "customer" &&  
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            
            <CustomerOrderForm handleOrderRequest={handleOrderRequest} />
            <CustomerPaymentForm handlePaymentUpload={handlePaymentUpload} />
            <CustomerOrderStatus orders={orders} />
          </div>
        )}

        {view === "admin" && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            
            <div className="m-5 w-1/2">
              <AdminOrders orders={orders} />
            </div>
            <div className="m-5">
              <AdminInventory
                inventory={inventory}
                handleInventoryUpdate={handleInventoryUpdate}
              />{" "}
            </div>
            <div className="m-5">
              <AdminPayments
                payments={payments}
                handlePaymentApproval={handlePaymentApproval}
              />
            </div>
          </div>
        )} */
}

// function CustomerOrderStatus({ orders }: { orders: OrderParam[] }) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Check Order Status</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Order ID</TableHead>
//               <TableHead>Date</TableHead>
//               <TableHead>Time</TableHead>
//               <TableHead>Frequency</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Payment</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {orders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>{order.id}</TableCell>
//                 <TableCell>{order.date}</TableCell>
//                 <TableCell>{order.time}</TableCell>
//                 <TableCell>{order.frequency}</TableCell>
//                 <TableCell>
//                   <Badge
//                     variant={
//                       order.status === "Pending"
//                         ? "warning"
//                         : order.status === "Scheduled"
//                         ? "info"
//                         : "success"
//                     }
//                   >
//                     {order.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>
//                   <Badge
//                     variant={
//                       order.payment.status === "Pending"
//                         ? "warning"
//                         : order.payment.status === "Approved"
//                         ? "info"
//                         : "success"
//                     }
//                   >
//                     {order.payment.status}
//                   </Badge>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }
