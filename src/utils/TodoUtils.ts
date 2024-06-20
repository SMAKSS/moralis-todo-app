/**
 * Type guard to check if the error is an instance of Error.
 * @param {unknown} error - The error to check.
 * @returns {boolean} True if the error is an instance of Error, false otherwise.
 */
export function isError(error: unknown): error is Error {
  return error instanceof Error;
}
