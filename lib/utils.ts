export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}
export const handleError = (error: unknown) => {
  console.error(error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};

export const generateUniqueId = (): string => {
  const timestamp = new Date().toISOString();
  const random = Math.random().toString(36).substr(2, 9);
  return `${timestamp}-${random}`;
};
