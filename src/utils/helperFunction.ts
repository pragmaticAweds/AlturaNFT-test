export const isValidContractAddress = (address: string): boolean => {
  const regex = /^0x[a-fA-F0-9]{40}$/;
  return regex.test(address);
};

export const handleError = (
  err: string,
  receiver: React.Dispatch<React.SetStateAction<string | null>>
) => {
  receiver(err);
  setTimeout(() => {
    receiver(null);
  }, 2000);
};

export const shortText = (text: string) => {
  return text.length > 20 ? text.slice(0, 20) + "..." : text;
};
