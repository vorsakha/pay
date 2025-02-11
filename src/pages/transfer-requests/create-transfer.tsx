import { zodResolver } from "@hookform/resolvers/zod";
import { Landmark, LoaderCircle } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  Create,
  CreateActions,
  CreateHeaderProps,
} from "@/components/custom/create";
import { InputDate } from "@/components/custom/input-date";
import { InputPhone } from "@/components/custom/input-phone";
import { VirtualizedList } from "@/components/custom/virtualized-list";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormContainer,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  transferRequestSchema,
  TransferRequestSchema,
} from "@/models/transfer-request/transfer-request.schema";
import { useAccountsQuery } from "@/pages/account/hooks/use-accounts-query";
import { useBanksQuery } from "@/pages/transfer-requests/hooks/use-banks-query";
import { useTransferMutation } from "@/pages/transfer-requests/hooks/use-transfer-mutation";
import {
  accountTypeOptions,
  bankAccountTypeOptions,
  blockchainOptions,
  currencyCodeOptions,
  documentTypeOptions,
  pixAccountTypeOptions,
  recipientTypeOptions,
  transferTypeOptions,
} from "@/pages/transfer-requests/utils/options";
import { ROUTES } from "@/routes/routes";
import { formatMoney } from "@/utils/format";
import { getLastFourDigits } from "@/utils/string";

export function CreateTransfer() {
  const navigate = useNavigate();
  const { createMutation, isCreatePending } = useTransferMutation();
  const { getApprovedAccounts, isLoading } = useAccountsQuery();

  const form = useForm<TransferRequestSchema>({
    resolver: zodResolver(transferRequestSchema),
  });
  const { isDirty } = form.formState;
  const { handleSubmit } = form;
  const currencyCode = form.watch("recipientsInfo.0.bankDetails.currencyCode");

  const { options: banksOptions, isLoading: bankIsLoading } = useBanksQuery(
    currencyCode ? [currencyCode, "USD"] : undefined,
  );

  const onSubmit = useCallback(
    (values: TransferRequestSchema) => {
      createMutation(values);
    },
    [createMutation],
  );

  const card: CreateHeaderProps = useMemo(
    () => ({
      title: "Transfer Request Info",
      description: "Create a new transfer request",
    }),
    [],
  );

  const actions: CreateActions[] = useMemo(
    () => [
      {
        label: "Cancel",
        disabled: isCreatePending,
        variant: "outline",
        onClick: () => navigate(ROUTES.TRANSFER_REQUESTS.LIST),
      },
      {
        label: "Create Transfer Request",
        disabled: !isDirty,
        isLoading: isCreatePending,
        onClick: () => handleSubmit(onSubmit)(),
      },
    ],
    [isCreatePending, isDirty, navigate, handleSubmit, onSubmit],
  );

  const transferType = form.watch("recipientsInfo.0.recipientTransferType");

  return (
    <Create title="Create Transfer Request" card={card} actions={actions}>
      <Form {...form}>
        <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="payoutAccountId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="inline-flex items-center gap-1">
                    Transfer From
                    {isLoading && (
                      <LoaderCircle className="w-3 h-3 animate-spin" />
                    )}
                  </span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the transfer from account" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getApprovedAccounts?.map((account) => (
                      <SelectItem value={account.id} key={account.id}>
                        <div className="flex flex-row gap-2 justify-between w-full">
                          <p className="flex flex-row gap-1 items-center">
                            {account.name}

                            <span className="flex flex-row text-muted-foreground text-xs items-center">
                              <Landmark className="w-4" />
                              {getLastFourDigits(account.address)}
                            </span>
                          </p>

                          <p className="">
                            -{" "}
                            {formatMoney(
                              account.balance.balance,
                              account.balance.tokenSymbol,
                            )}
                          </p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="memo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Memo</FormLabel>
                <FormControl>
                  <Input placeholder="Memo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Accordion
            type="multiple"
            className="col-span-full"
            defaultValue={[
              "recipient-info",
              "bank-details",
              "wallet-details",
              "address-details",
            ]}
          >
            <hr className="mt-4" />
            <AccordionItem className="border-0" value="recipient-info">
              <AccordionTrigger>Recipient Info</AccordionTrigger>
              <AccordionContent className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-2">
                <FormField
                  control={form.control}
                  name="recipientsInfo.0.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Contractors" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipientsInfo.0.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="E-mail" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipientsInfo.0.tokenAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Token Amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipientsInfo.0.recipientType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the recipient type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {recipientTypeOptions?.map((account) => (
                            <SelectItem
                              value={account.value}
                              key={account.value}
                            >
                              {account.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipientsInfo.0.dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <InputDate
                          placeholder="Pick a Date of Birth"
                          toDate={new Date()}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipientsInfo.0.phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <InputPhone placeholder="Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipientsInfo.0.recipientTransferType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transfer Type</FormLabel>
                      <Select
                        onValueChange={(e) => {
                          field.onChange(e);
                          form.setValue(
                            "recipientsInfo.0.bankDetails",
                            undefined,
                          );
                          form.setValue(
                            "recipientsInfo.0.walletDetails",
                            undefined,
                          );
                          form.clearErrors(["recipientsInfo.0.bankDetails"]);
                          form.clearErrors(["recipientsInfo.0.walletDetails"]);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the transfer type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {transferTypeOptions?.map((account) => (
                            <SelectItem
                              value={account.value}
                              key={account.value}
                            >
                              {account.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>

            {transferType === "FIAT" && (
              <AccordionItem className="border-0" value="bank-details">
                <hr className="mt-4" />
                <AccordionTrigger>Bank Details</AccordionTrigger>

                <AccordionContent className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-2">
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.currencyCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency Code</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the currency code" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {currencyCodeOptions?.map((account) => (
                              <SelectItem
                                value={account.value}
                                key={account.value}
                              >
                                {account.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <span className="inline-flex flex-row items-center gap-1">
                            Bank Name
                            {bankIsLoading && (
                              <LoaderCircle className="w-3 h-3 animate-spin" />
                            )}
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={bankIsLoading || !banksOptions}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select the bank name" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {banksOptions && banksOptions.length > 100 ? (
                                <VirtualizedList
                                  items={banksOptions}
                                  itemHeight={35}
                                  height={200}
                                  renderItem={(option) => (
                                    <SelectItem
                                      value={option.value}
                                      key={option.value}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  )}
                                />
                              ) : (
                                banksOptions?.map((option) => (
                                  <SelectItem
                                    value={option.value}
                                    key={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.bankAccountOwnerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Account Owner Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Bank Account Owner Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.accountType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the account type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {accountTypeOptions?.map((account) => (
                              <SelectItem
                                value={account.value}
                                key={account.value}
                              >
                                {account.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.pixAccountType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pix Account Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the pix account type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {pixAccountTypeOptions?.map((account) => (
                              <SelectItem
                                value={account.value}
                                key={account.value}
                              >
                                {account.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.pixEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pix Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Pix Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.pixPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pix Phone</FormLabel>
                        <FormControl>
                          <InputPhone placeholder="Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.bankAccountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Account Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Bank Account Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.bankRoutingNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Routing Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Bank Routing Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.iban"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IBAN</FormLabel>
                        <FormControl>
                          <Input placeholder="IBAN" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.swiftBic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SWIFT BIC</FormLabel>
                        <FormControl>
                          <Input placeholder="SWIFT BIC" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.branchCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Branch Code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.documentNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Document Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Document Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.documentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Document Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the document type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {documentTypeOptions?.map((account) => (
                              <SelectItem
                                value={account.value}
                                key={account.value}
                              >
                                {account.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ISO 3166-1 alpha-2 country code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.bankAccountNumberType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Account Number Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the bank account number type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {bankAccountTypeOptions?.map((account) => (
                              <SelectItem
                                value={account.value}
                                key={account.value}
                              >
                                {account.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            )}
            {transferType === "FIAT" && (
              <AccordionItem className="border-0" value="address-details">
                <hr className="mt-4" />
                <AccordionTrigger>Address Details</AccordionTrigger>
                <AccordionContent className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-2">
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.physicalAddress.address1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address 1</FormLabel>
                        <FormControl>
                          <Input placeholder="Address 1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.physicalAddress.address2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address 2</FormLabel>
                        <FormControl>
                          <Input placeholder="Address 2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.physicalAddress.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Account Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.physicalAddress.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.physicalAddress.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.bankDetails.physicalAddress.zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip</FormLabel>
                        <FormControl>
                          <Input placeholder="Zip" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            )}

            {transferType === "BLOCKCHAIN" && (
              <AccordionItem className="border-0" value="wallet-details">
                <hr className="mt-4" />
                <AccordionTrigger>Wallet Details</AccordionTrigger>

                <AccordionContent className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-2">
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.walletDetails.walletAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wallet Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Wallet Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recipientsInfo.0.walletDetails.blockchain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blockchain</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the blockchain" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {blockchainOptions?.map((account) => (
                              <SelectItem
                                value={account.value}
                                key={account.value}
                              >
                                {account.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </FormContainer>
      </Form>
    </Create>
  );
}
