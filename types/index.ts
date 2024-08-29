export type CreateUserParams = {
  clerkId: String;
  email: String;
  role?: String;
  firstName: String;
  lastName: String;
};

export type UpdateUserParams = {
  firstName: String;
  lastName: String;
};

export type OrderParam = {
  id: number;
  customer: string;
  date: string;
  time: string;
  frequency: string;
  status: string;
  payment: {
    method: string;
    amount: number;
    status: string;
  };
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
  type: String;
  fabric: String;
  quantity: number;
};

export type CreateOrderParams = {
  id: String;
  orderDateTime: Date;
  status: String;
  price: number;
  owner: CreateUserParams;
  items: ItemParams[];
};
