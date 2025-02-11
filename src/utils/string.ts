const getLastFourDigits = (str?: string): string => {
  if (!str) return "";

  return `xxxx${str.slice(-4)}`;
};

export { getLastFourDigits };
