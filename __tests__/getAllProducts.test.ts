import { getAllProducts } from "@/lib/actions/product.action";
import { connectToDatabase } from "@/utils/database";
import ProductModel from "@/models/product";

jest.mock("@/utils/database", () => ({
  connectToDatabase: jest.fn(),
}));

jest.mock("@/models/product", () => ({
  find: jest.fn(),
}));

describe("getAllProducts", () => {
  const mockProducts = [
    {
      _id: "mockId1",
      id: "prod_1",
      name: "Product 1",
      quantity: 10,
      unitPrice: 9.99,
    },
    {
      _id: "mockId2",
      id: "prod_2",
      name: "Product 2",
      quantity: 5,
      unitPrice: 19.99,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve all products", async () => {
    (ProductModel.find as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockProducts),
    });

    const result = await getAllProducts();

    expect(connectToDatabase).toHaveBeenCalled();
    expect(ProductModel.find).toHaveBeenCalled();
    expect(result).toEqual(mockProducts.map(({ _id, ...rest }) => rest));
  });

  it("should return an empty array when no products are found", async () => {
    (ProductModel.find as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue([]),
    });

    const result = await getAllProducts();

    expect(connectToDatabase).toHaveBeenCalled();
    expect(ProductModel.find).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it("should handle database connection errors", async () => {
    const mockError = new Error("Database connection failed");
    (connectToDatabase as jest.Mock).mockRejectedValue(mockError);

    await expect(getAllProducts()).rejects.toThrow(
      "Database connection failed"
    );
  });
});
