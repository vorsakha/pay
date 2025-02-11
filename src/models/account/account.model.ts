import { Blockchain } from "@/models/transfer-request/transfer-request.model";

interface Account {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  address: string;
  blockchain: Blockchain;
  balance: {
    balance: number;
    tokenSymbol: string;
  };
  isApiEnabled: boolean;
  isPending: boolean;
}

export type { Account };
