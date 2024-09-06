import { getUserById } from "@/lib/actions/user.action";
import { connectToDatabase } from "@/utils/database";
import User from "@/models/user";

jest.mock("@/utils/database", () => ({
  connectToDatabase: jest.fn(),
}));

jest.mock("@/models/user", () => ({
  findOne: jest.fn(),
}));

describe("getUserById", () => {
  const mockUser = {
    _id: "mockId",
    clerkId: "test_clerk_id",
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
    role: "customer",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve a user by Clerk ID", async () => {
    (User.findOne as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockUser),
    });

    const result = await getUserById(mockUser.clerkId);

    expect(connectToDatabase).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalledWith({ clerkId: mockUser.clerkId });
    expect(result).toEqual(mockUser);
  });

  it("should return null if user is not found", async () => {
    (User.findOne as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(null),
    });

    const result = await getUserById("nonexistent_id");

    expect(connectToDatabase).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalledWith({ clerkId: "nonexistent_id" });
    expect(result).toBeNull();
  });
});
