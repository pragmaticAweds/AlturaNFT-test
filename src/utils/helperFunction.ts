/**
 * Checks if the given string matches the pattern of a valid Ethereum contract address.
 *
 * @param {string} address The string to check.
 * @returns {boolean} True if the address matches the pattern, false otherwise.
 */
export const isValidContractAddress = (address: string): boolean => {
  const regex = /^0x[a-fA-F0-9]{40}$/;
  return regex.test(address);
};

/**
 * Sets the given error message to the specified receiver state and clears it after a 2-second delay.
 *
 * @param {string} err The error message to set.
 * @param {React.Dispatch<React.SetStateAction<string | null>>} receiver The state setter function to use.
 * @returns {void}
 */
export const handleError = (
  err: string,
  receiver: React.Dispatch<React.SetStateAction<string | null>>
) => {
  receiver(err);
  setTimeout(() => {
    receiver(null);
  }, 2000);
};

/**
 * Returns a shortened version of the given string if it exceeds 20 characters, or the original string if it doesn't.
 *
 * @param {string} text The string to shorten.
 * @param {number} length The length of text to  shorten.
 * @returns {string} The shortened version of the string.
 */
export const shortText = (text: string, length: number = 20) => {
  if (!text) {
    return "";
  }
  return text.length > length ? text.slice(0, length) + "..." : text;
};
