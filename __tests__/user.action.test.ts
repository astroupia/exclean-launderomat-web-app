import {
  createUser,
  getUserById,
  updateUser,
  getUserRole,
  deleteUser,
  getUserByEmail,
} from "@/lib/actions/user.action";
import { connectToDatabase } from "@/utils/database";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

// Mock the database connection
jest.mock("@/utils/database", () => ({
  connectToDatabase: jest.fn(),
}));

// Mock the User model
jest.mock("@/models/user", () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

// Mock revalidatePath from next/cache
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("User actions", () => {
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

      await expect(createUser(mockUser)).rejects.toThrow(
        "User creation failed"
      );
    });
  });

  describe("getUserById", () => {
    it("should retrieve a user by Clerk ID", async () => {
      (User.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockUser),
      });

      const result = await getUserById(mockUser.clerkId);

      expect(connectToDatabase).toHaveBeenCalled();
      expect(User.findOne).toHaveBeenCalledWith({ clerkId: mockUser.clerkId });
      expect(result).toEqual(mockUser);
    });
  });

  describe("getUserRole", () => {
    it("should return the user's role", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await getUserRole(mockUser.clerkId);

      expect(connectToDatabase).toHaveBeenCalled();
      expect(User.findOne).toHaveBeenCalledWith({ clerkId: mockUser.clerkId });
      expect(result).toBe(mockUser.role);
    });

    it("should return 'customer' if user not found", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const result = await getUserRole("nonexistent_id");

      expect(result).toBe("customer");
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (User.findByIdAndDelete as jest.Mock).mockResolvedValue(mockUser);

      const result = await deleteUser(mockUser.clerkId);

      expect(connectToDatabase).toHaveBeenCalled();
      expect(User.findOne).toHaveBeenCalledWith({ clerkId: mockUser.clerkId });
      expect(User.findByIdAndDelete).toHaveBeenCalledWith(mockUser._id);
      expect(revalidatePath).toHaveBeenCalledWith("/");
      expect(result).toEqual(mockUser);
    });

    it("should throw an error if user not found", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(deleteUser("nonexistent_id")).rejects.toThrow(
        "User not found"
      );
    });
  });

  describe("getUserByEmail", () => {
    it("should retrieve a user by email", async () => {
      (User.findOne as jest.Mock).mockReturnValue({
        toObject: jest.fn().mockReturnValue(mockUser),
      });

      const result = await getUserByEmail(mockUser.email);

      expect(connectToDatabase).toHaveBeenCalled();
      expect(User.findOne).toHaveBeenCalledWith({
        email: mockUser.email.toLowerCase(),
      });
      expect(result).toEqual(mockUser);
    });

    it("should return null if email is undefined", async () => {
      const result = await getUserByEmail(undefined);

      expect(result).toBeNull();
      expect(connectToDatabase).not.toHaveBeenCalled();
    });

    it("should return null if user not found", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const result = await getUserByEmail("nonexistent@example.com");

      expect(result).toBeNull();
    });
  });
});
