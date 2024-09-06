export type CreateUserParams = {
  clerkId: string;
  email: string;
  role?: string;
  firstName: string;
  lastName: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
};

export type InventoryItemParam = {
  id: number;
  item: string;
  quantity: number;
};

export type PaymentParam = {
  id: string; // Change this to string if it's not already
  orderId: string;
  customer: string;
  amount: number;
  method: string;
  status: "Pending" | "Approved" | "Rejected";
  bankStatementUrl: string;
};

export type Payment = {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  method: string;
  status: "Pending" | "Approved" | "Rejected";
  bankStatementUrl: string;
};

export type ItemParams = {
  type: string;
  fabric: string;
  quantity: number;
};

export interface Order {
  _id: string; // MongoDB ObjectId
  id: string;
  orderDateTime: Date;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  type: string[]; // Changed to string array
  cleaningType: "Dry" | "Wet" | "Steam" | "Other";
  price: number;
  owner: string; // MongoDB ObjectId as string
}

export interface CreateOrderParams {
  userId: string;
  order: {
    id: string;
    orderDateTime: Date;
    status: "Pending" | "In Progress" | "Completed" | "Cancelled";
    type: string[]; // Changed to string array
    cleaningType: "Dry" | "Wet" | "Steam" | "Other";
    price: number;
  };
}

export type UpdateOrderParams = Partial<Omit<Order, "id" | "owner">>;

export type GetOrderParams = {
  id: string;
};

export type GetUserOrdersParams = {
  userId: string;
};

export interface Product {
  id: string;
  name: string;
  quantity: string;
  unitPrice: string;
}

export type CreateProductParams = Omit<Product, "id">;
export type UpdateProductParams = Partial<CreateProductParams>;

export type OrderType = {
  _id: string;
  id: string;
  orderDateTime: Date;
  status: string;
  type: string;
  cleaningType: string;
  price: number;
  owner: string;
};
