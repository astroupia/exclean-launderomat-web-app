export type CreateUserPramas = {
  clerkId: String;
  email: String;
  role?: String;
  firstName: String;
  lastName: String;
};

export type UpdateUserPramas = {
  firstName: String;
  lastName: String;
};
