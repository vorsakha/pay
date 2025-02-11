const isValidCountryCode = (code?: string): boolean => {
  if (!code) return false;

  return /^[A-Z]{2}$/.test(code);
};

export { isValidCountryCode };
