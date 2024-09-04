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
  id: number;
  customer: string;
  amount: number;
  method: string;
  status: string;
};

export type ItemParams = {
  type: string;
  fabric: string;
  quantity: number;
};

export interface Order {
  id: string;
  orderDateTime: Date;
  status: string;
  type: string;
  cleaningType: "Dry" | "Wet" | "Steam" | "Other";
  price: number;
  owner: string;
}

export interface CreateOrderParams {
  userId: string;
  order: {
    id: string;
    orderDateTime: Date;
    status: string;
    type: string;
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
