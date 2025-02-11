import { Filters } from "@/models";
import { Account } from "@/models/account/account.model";

type CustomerStatus =
  | "INACTIVE"
  | "PENDING"
  | "COMPLETE"
  | "ERROR"
  | "REJECTED";

type CustomerType = "INDIVIDUAL" | "BUSINESS";

interface Customer {
  id: string;
  createdAt: string;
  updatedAt: string;
  accountId: string;
  name: string;
  customerType: CustomerType;
  status: CustomerStatus;
  account?: Account;
}

interface CustomerKyc {
  kycLink: string;
}

interface CustomerFilters extends Filters {
  filter?: string;
}

export type {
  Customer,
  CustomerStatus,
  CustomerType,
  CustomerKyc,
  CustomerFilters,
};
