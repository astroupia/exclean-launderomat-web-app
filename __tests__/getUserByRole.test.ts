import { getUserRole } from "@/lib/actions/user.action";
import { connectToDatabase } from "@/utils/database";
import User from "@/models/user";

jest.mock("@/utils/database", () => ({
  connectToDatabase: jest.fn(),
}));

jest.mock("@/models/user", () => ({
  findOne: jest.fn(),
}));

describe("getUserRole", () => {
  const mockUser = {
    _id: "mockId",
    clerkId: "test_clerk_id",
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
    role: "admin",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the user's role when user is found", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);

    const result = await getUserRole(mockUser.clerkId);

    expect(connectToDatabase).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalledWith({ clerkId: mockUser.clerkId });
    expect(result).toBe(mockUser.role);
  });

  it("should return 'customer' when user is not found", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    const result = await getUserRole("nonexistent_id");

    expect(connectToDatabase).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalledWith({ clerkId: "nonexistent_id" });
    expect(result).toBe("customer");
  });
});
