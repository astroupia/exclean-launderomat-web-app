import { connectToDatabase } from "@/utils/database";
import { CreateOrderParams, Order as OrderType } from "@/types";
import { ObjectId } from "mongodb";

export async function createOrder(params: CreateOrderParams) {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection("users");
    const ordersCollection = db.collection("orders");

    // Validate user by userId
    const user = await usersCollection.findOne({ clerkId: params.userId });

    if (!user) {
      throw new Error("User not found");
    }

    // Create the order
    const newOrder = await ordersCollection.insertOne({
      ...params.order,
      owner: user._id,
    });
    // Return the new order
    return newOrder.insertedId;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order. Please try again later.");
  }
}

// async function testModel() {
//   try {
//     await connectToDatabase();

//     console.log("Connected to MongoDB");

//     const newOrder = new Order({
//       id: new Date().toISOString(), // Generate a unique ID for the order
//       orderDateTime: new Date(),
//       status: "Pending",
//       type: "Shirt",
//       cleaningType: "Dry",
//       price: 15,
//       owner: "UserID",
//     });

//     await newOrder.save();
//     console.log("Order saved:", newOrder);
//   } catch (error) {
//     console.error("Error testing model:", error);
//   } finally {
//     mongoose.disconnect();
//   }
// }

// const testCreateOrder = async () => {
//   // Define a test order
//   const testOrder: CreateOrderParams = {
//     id: new Date().toISOString(),
//     orderDateTime: new Date(),
//     status: "Pending",
//     type: "Shirt",
//     cleaningType: "Dry",
//     price: 15,
//     owner: "test-user-id", // This will be overridden in createOrder
//   };

//   try {
//     // Call the createOrder function from OrderService
//     const createdOrder = await createOrder(
//       testOrder,
//       "user_2lKaIDaHrStiEiVMtdYpDRbVv3a"
//     );
//     console.log("Created Order:", createdOrder);
//   } catch (error) {
//     console.error("Failed to create order:", error);
//   }
// };

// // Run the test function
// // testCreateOrder();
