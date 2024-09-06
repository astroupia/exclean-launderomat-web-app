import { createUser } from "@/lib/actions/user.action";
import { connectToDatabase } from "@/utils/database";
import User from "@/models/user";

jest.mock("@/utils/database", () => ({
  connectToDatabase: jest.fn(),
}));

jest.mock("@/models/user", () => ({
  create: jest.fn(),
}));

describe("createUser", () => {
  const mockUser = {
    clerkId: "test_clerk_id",
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
    role: "customer",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user successfully", async () => {
    (User.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await createUser(mockUser);

    expect(connectToDatabase).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });

  it("should throw an error if user creation fails", async () => {
    const mockError = new Error("User creation failed");
    (User.create as jest.Mock).mockRejectedValue(mockError);

    await expect(createUser(mockUser)).rejects.toThrow("User creation failed");
  });
});
