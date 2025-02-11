import { Filters } from "..";

type TransferRequestStatus =
  | "PENDING"
  | "IN_REVIEW"
  | "CANCELLED"
  | "EXECUTED"
  | "FAILED";

type TransferType = "FIAT" | "BLOCKCHAIN";

type WithdrawalRequestStatus =
  | "AWAITING_SOURCE_DEPOSIT"
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELED";

type Blockchain = "ETHEREUM" | "POLYGON" | "BASE" | "CELO";

type CurrencyCode =
  | "USD"
  | "COP"
  | "ARS"
  | "EUR"
  | "MXN"
  | "BRL"
  | "CLP"
  | "PEN"
  | "BOB"
  | "CRC"
  | "ZAR";

interface TransferRequest {
  id?: string;
  createdAt: string;
  updatedAt: string;
  payoutAccountId?: string;
  transactionHash?: string;
  memo?: string;
  status: TransferRequestStatus;
  recipientsInfo: Array<{
    id?: string;
    createdAt: string;
    updatedAt: string;
    recipientTransferType: TransferType;
    tokenAmount: number;
    fiatDetails?: {
      withdrawalRequestStatus: WithdrawalRequestStatus;
      currencyCode?: CurrencyCode;
      fiatAmount?: number;
      transactionFee?: number;
      exchangeFeePercentage?: number;
      exchangeRate?: number;
      feeTotal?: number;
      initiatedAt?: string;
      completedAt?: string;
    };
    blockchainDetails?: {
      walletAddress: string;
      blockchain: Blockchain;
    };
  }>;
}

interface TransferRequestFilters extends Filters {
  status?: TransferRequestStatus;
}

export type {
  TransferRequest,
  TransferRequestStatus,
  Blockchain,
  TransferRequestFilters,
};
