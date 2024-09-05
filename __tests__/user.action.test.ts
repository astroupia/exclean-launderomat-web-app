import { createUser } from "@/lib/actions/user.action";
import { connectToDatabase } from "@/utils/database";
import User from "@/models/user";

// Mock the database connection
jest.mock("@/utils/database", () => ({
  connectToDatabase: jest.fn(),
  mongoose: {
    connection: {
      db: {
        collection: jest.fn().mockReturnValue({
          insertOne: jest.fn().mockResolvedValue({ insertedId: "mockedId" }),
        }),
      },
    },
  },
}));

// Mock the User model
jest.mock("@/models/user", () => ({
  create: jest.fn(),
}));

describe("createUser", () => {
  it("should create a user successfully", async () => {
    const mockUser = {
      clerkId: "test_clerk_id",
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      role: "customer",
    };

    (User.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await createUser(mockUser);

    expect(connectToDatabase).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });

  it("should throw an error if user creation fails", async () => {
    const mockUser = {
      clerkId: "test_clerk_id",
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      role: "customer",
    };

    const mockError = new Error("User creation failed");
    (User.create as jest.Mock).mockRejectedValue(mockError);

    await expect(createUser(mockUser)).rejects.toThrow("User creation failed");
  });
});
