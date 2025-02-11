import { BadgeProps } from "@/components/ui/badge";
import { TransferRequestStatus } from "@/models/transfer-request/transfer-request.model";

const statusMapping: Record<TransferRequestStatus, string> = {
  PENDING: "Pending",
  IN_REVIEW: "In Review",
  CANCELLED: "Cancelled",
  EXECUTED: "Executed",
  FAILED: "Failed",
};

const badgeVariantMapping: Record<
  TransferRequestStatus,
  BadgeProps["variant"]
> = {
  PENDING: "outline",
  IN_REVIEW: "outline",
  CANCELLED: "destructive",
  EXECUTED: "success",
  FAILED: "destructive",
};

export { statusMapping, badgeVariantMapping };
