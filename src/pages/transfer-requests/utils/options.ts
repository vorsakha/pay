const transferTypeOptions = [
  { value: "FIAT", label: "Fiat" },
  { value: "BLOCKCHAIN", label: "Blockchain" },
];

const recipientTypeOptions = [
  { value: "INDIVIDUAL", label: "Individual" },
  { value: "BUSINESS", label: "Business" },
];

const blockchainOptions = [
  { value: "ETHEREUM", label: "Ethereum" },
  { value: "POLYGON", label: "Polygon" },
  { value: "BASE", label: "Base" },
  { value: "CELO", label: "Celo" },
];

const accountTypeOptions = [
  { value: "CHECKING", label: "Checking" },
  { value: "SAVINGS", label: "Savings" },
];

const pixAccountTypeOptions = [
  { value: "PHONE", label: "Phone" },
  { value: "EMAIL", label: "Email" },
  { value: "DOCUMENT", label: "Document" },
  { value: "BANK_ACCOUNT", label: "Bank Account" },
];

const documentTypeOptions = [
  { value: "NATIONAL_ID", label: "National ID" },
  { value: "PASSPORT", label: "Passport" },
  { value: "RESIDENT_ID", label: "Resident ID" },
  { value: "RUC", label: "RUC" },
];

const bankAccountTypeOptions = [
  { value: "CHECKING", label: "Checking" },
  { value: "SAVINGS", label: "Savings" },
];

const currencyCodeOptions = [
  { value: "USD", label: "USD" },
  { value: "COP", label: "COP" },
  { value: "ARS", label: "ARS" },
  { value: "EUR", label: "EUR" },
  { value: "MXN", label: "MXN" },
  { value: "BRL", label: "BRL" },
  { value: "CLP", label: "CLP" },
  { value: "PEN", label: "PEN" },
  { value: "BOB", label: "BOB" },
  { value: "CRC", label: "CRC" },
  { value: "ZAR", label: "ZAR" },
];

export {
  transferTypeOptions,
  recipientTypeOptions,
  blockchainOptions,
  accountTypeOptions,
  pixAccountTypeOptions,
  documentTypeOptions,
  bankAccountTypeOptions,
  currencyCodeOptions,
};
