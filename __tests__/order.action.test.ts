import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
} from "@/lib/actions/order.action";
import { CreateOrderParams } from "@/types";

let mongoClient: MongoClient;
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  mongoClient = new MongoClient(mongoUri);
  await mongoClient.connect();
});

afterAll(async () => {
  await mongoClient.close();
  await mongoServer.stop();
});

describe("Order Actions", () => {
  beforeEach(async () => {
    const db = mongoClient.db();
    await db.collection("users").deleteMany({});
    await db.collection("orders").deleteMany({});
  });

  describe("createOrder", () => {
    it("should create an order for an existing user", async () => {
      const db = mongoClient.db();
      const usersCollection = db.collection("users");
      const ordersCollection = db.collection("orders");

      // Create a test user
      const testUser = { clerkId: "test_clerk_id", name: "Test User" };
      await usersCollection.insertOne(testUser);

      const orderParams: CreateOrderParams = {
        userId: "test_clerk_id",
        order: {
          id: "test_order_id",
          orderDateTime: new Date(),
          status: "Pending",
          type: ["Shirt", "Jeans"],
          cleaningType: "Dry",
          price: 30,
        },
      };

      const result = await createOrder(orderParams);

      expect(result).toBeDefined();
      expect(result.insertedId).toBeDefined();

      const createdOrder = await ordersCollection.findOne({
        _id: result.insertedId,
      });
      expect(createdOrder).toBeDefined();
      if (createdOrder) {
        expect(createdOrder.status).toBe("Pending");
        expect(createdOrder.type).toEqual(["Shirt", "Jeans"]);
        expect(createdOrder.price).toBe(30);
      }
    });
  });

  describe("getOrders", () => {
    it("should get orders for a specific user", async () => {
      const db = mongoClient.db();
      const usersCollection = db.collection("users");
      const ordersCollection = db.collection("orders");

      const testUser = { clerkId: "test_clerk_id", name: "Test User" };
      const userResult = await usersCollection.insertOne(testUser);

      const testOrders = [
        {
          userId: userResult.insertedId,
          status: "Pending",
          type: ["Shirt"],
          cleaningType: "Dry",
          price: 10,
        },
        {
          userId: userResult.insertedId,
          status: "Completed",
          type: ["Jeans"],
          cleaningType: "Wet",
          price: 20,
        },
      ];
      await ordersCollection.insertMany(testOrders);

      const orders = await getOrders("test_clerk_id");

      expect(orders).toHaveLength(2);
      expect(orders[0].status).toBe("Pending");
      expect(orders[1].status).toBe("Completed");
    });
  });

  describe("updateOrderStatus", () => {
    it("should update the status of an order", async () => {
      const db = mongoClient.db();
      const usersCollection = db.collection("users");
      const ordersCollection = db.collection("orders");

      const testUser = { clerkId: "test_clerk_id", name: "Test User" };
      const userResult = await usersCollection.insertOne(testUser);

      const testOrder = {
        userId: userResult.insertedId,
        status: "Pending",
        type: ["Shirt"],
        cleaningType: "Dry",
        price: 10,
      };
      const orderResult = await ordersCollection.insertOne(testOrder);

      const updatedOrder = await updateOrderStatus(
        orderResult.insertedId.toString(),
        "In Progress"
      );
      expect(updatedOrder).toBeDefined();
      expect(updatedOrder?.status).toBe("In Progress");

      const checkOrder = await ordersCollection.findOne({
        _id: orderResult.insertedId,
      });
      expect(checkOrder?.status).toBe("In Progress");
    });
  });
});
