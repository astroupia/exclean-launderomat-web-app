/**
 * Converts a Mongoose document or any object to a plain JavaScript object.
 * This is useful for serializing data to be passed between Server and Client Components.
 * @param doc The document or object to convert
 * @returns A plain JavaScript object
 */
export function toPlainObject<T>(doc: T): T {
  return JSON.parse(JSON.stringify(doc));
}

/**
 * Formats a date to a string in the format "YYYY-MM-DD".
 * @param date The date to format
 * @returns A string representation of the date
 */
export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

/**
 * Truncates a string to a specified length and adds an ellipsis if truncated.
 * @param str The string to truncate
 * @param maxLength The maximum length of the string
 * @returns The truncated string
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

/**
 * Capitalizes the first letter of a string.
 * @param str The string to capitalize
 * @returns The capitalized string
 */
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generates a random string of specified length.
 * @param length The length of the string to generate
 * @returns A random string
 */
export function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
