import { format } from "date-fns";
import { z } from "zod";

import { isValidCountryCode } from "@/utils/test";

const transferRequestSchema = z
  .object({
    payoutAccountId: z.string(),
    memo: z.string().optional(),
    recipientsInfo: z.array(
      z.object({
        name: z.string(),
        tokenAmount: z.string().transform((value) => parseFloat(value)),
        email: z.string().email(),
        recipientType: z.enum(["INDIVIDUAL", "BUSINESS"]),
        dateOfBirth: z
          .date()
          .optional()
          .transform((value) => {
            if (!value) return undefined;
            return format(value, "yyyy-MM-dd");
          }),
        phoneNumber: z.string().optional(),
        recipientTransferType: z.enum(["FIAT", "BLOCKCHAIN"]),
        bankDetails: z
          .object({
            bankName: z.string(),
            bankAccountOwnerName: z.string(),
            accountType: z.enum(["CHECKING", "SAVINGS"]).optional(),
            pixAccountType: z
              .enum(["PHONE", "EMAIL", "DOCUMENT", "BANK_ACCOUNT"])
              .optional(),
            pixEmail: z.string().email().optional(),
            pixPhone: z.string().optional(),
            bankAccountNumber: z.string().optional(),
            bankRoutingNumber: z.string().optional(),
            iban: z.string().optional(),
            swiftBic: z.string().optional(),
            branchCode: z.string().optional(),
            documentNumber: z.string().optional(),
            documentType: z
              .enum(["NATIONAL_ID", "PASSPORT", "RESIDENT_ID", "RUC"])
              .optional(),
            country: z.string().optional(),
            bankAccountNumberType: z.enum(["CVU", "CBU", "ALIAS"]).optional(),
            physicalAddress: z.object({
              address1: z.string(),
              address2: z.string().optional(),
              country: z.string().refine((code) => isValidCountryCode(code), {
                message: "Country code is invalid",
              }),
              state: z.string(),
              city: z.string(),
              zip: z.string(),
            }),
            currencyCode: z.enum([
              "USD",
              "COP",
              "ARS",
              "EUR",
              "MXN",
              "BRL",
              "CLP",
              "PEN",
              "BOB",
              "CRC",
              "ZAR",
            ]),
          })
          .optional(),
        walletDetails: z
          .object({
            walletAddress: z.string(),
            blockchain: z.enum(["ETHEREUM", "POLYGON", "BASE", "CELO"]),
          })
          .optional(),
      }),
    ),
  })
  .superRefine((data, ctx) => {
    data.recipientsInfo.forEach((recipient, index) => {
      if (recipient.recipientTransferType === "FIAT") {
        if (!recipient.bankDetails) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Bank details are required for FIAT transfer",
            path: ["recipientsInfo", index, "bankDetails"],
          });
          return;
        }

        const bankDetails = recipient.bankDetails;
        const currency = bankDetails.currencyCode;

        if (["USD", "COP", "ARS", "PEN", "ZAR"].includes(currency)) {
          if (!bankDetails.pixAccountType) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Pix Account Type is required for currency ${currency}`,
              path: ["recipientsInfo", index, "bankDetails", "pixAccountType"],
            });
          }
        }

        // PIX related requirements
        if (bankDetails.pixAccountType === "PHONE" && !bankDetails.pixPhone) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Pix Phone is required",
            path: ["recipientsInfo", index, "bankDetails", "pixPhone"],
          });
        }
        if (bankDetails.pixAccountType === "EMAIL" && !bankDetails.pixEmail) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Pix Email is required",
            path: ["recipientsInfo", index, "bankDetails", "pixEmail"],
          });
        }
        if (
          bankDetails.pixAccountType === "DOCUMENT" &&
          !bankDetails.documentNumber
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "Document Number is required when Pix Account Type is DOCUMENT",
            path: ["recipientsInfo", index, "bankDetails", "documentNumber"],
          });
        }
        if (
          bankDetails.pixAccountType === "BANK_ACCOUNT" &&
          !bankDetails.bankAccountNumber
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "Bank Account Number is required when Pix Account Type is BANK_ACCOUNT",
            path: ["recipientsInfo", index, "bankDetails", "bankAccountNumber"],
          });
        }

        // Currency requirements
        if (currency === "USD") {
          if (!bankDetails.bankRoutingNumber) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Bank Routing Number is required for USD",
              path: [
                "recipientsInfo",
                index,
                "bankDetails",
                "bankRoutingNumber",
              ],
            });
          }
        }
        if (["EUR", "CRC"].includes(currency)) {
          if (!bankDetails.iban) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `IBAN is required for ${currency}`,
              path: ["recipientsInfo", index, "bankDetails", "iban"],
            });
          }
          if (currency === "EUR" && !bankDetails.swiftBic) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "SWIFT BIC is required for EUR",
              path: ["recipientsInfo", index, "bankDetails", "swiftBic"],
            });
          }
        }
        if (currency === "BRL") {
          if (!bankDetails.branchCode) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Branch Code is required for BRL",
              path: ["recipientsInfo", index, "bankDetails", "branchCode"],
            });
          }
        }
        if (["COP", "ARS", "BRL", "BOB", "PEN", "CRC"].includes(currency)) {
          if (!bankDetails.documentNumber) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Document Number is required for ${currency}`,
              path: ["recipientsInfo", index, "bankDetails", "documentNumber"],
            });
          }
        }
        if (["COP", "BOB", "CLP", "PEN", "CRC"].includes(currency)) {
          if (!bankDetails.documentType) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Document Type is required for ${currency}`,
              path: ["recipientsInfo", index, "bankDetails", "documentType"],
            });
          }
        }
        if (currency === "EUR") {
          if (!bankDetails.country) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Country is required for EUR",
              path: ["recipientsInfo", index, "bankDetails", "country"],
            });
          }
        }
        if (currency === "ARS") {
          if (!bankDetails.bankAccountNumberType) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Bank Account Number Type is required for ARS",
              path: [
                "recipientsInfo",
                index,
                "bankDetails",
                "bankAccountNumberType",
              ],
            });
          }
        }
      } else if (recipient.recipientTransferType === "BLOCKCHAIN") {
        if (!recipient.walletDetails) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Wallet details are required for BLOCKCHAIN transfer",
            path: ["recipientsInfo", index, "walletDetails"],
          });
        }
      }
    });
  });

type TransferRequestSchema = z.infer<typeof transferRequestSchema>;

export { transferRequestSchema };
export type { TransferRequestSchema };
