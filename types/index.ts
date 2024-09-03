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
  cleaningType: string;
  price: number;
  owner: string; // Assuming owner is a string representing the user ID
}

export type CreateOrderParams = {
  userId: string;
  order: Order;
};

export interface Product {
  id: string;
  name: string;
  quantity: string;
  unitPrice: string;
}
