import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  Create,
  CreateActions,
  CreateHeaderProps,
} from "@/components/custom/create";
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
import { accountSchema, AccountSchema } from "@/models/account/account.schema";
import { useAccountMutation } from "@/pages/account/hooks/use-account-mutation";
import { ROUTES } from "@/routes/routes";

export function CreateAccounts() {
  const navigate = useNavigate();
  const { mutate, isPending } = useAccountMutation();

  const form = useForm<AccountSchema>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: undefined,
      description: undefined,
    },
  });
  const { isDirty } = form.formState;
  const { handleSubmit } = form;

  const onSubmit = useCallback(
    (values: AccountSchema) => {
      mutate(values);
    },
    [mutate],
  );

  const card: CreateHeaderProps = useMemo(
    () => ({
      title: "Account Info",
      description: "Create a new account",
    }),
    [],
  );

  const actions: CreateActions[] = useMemo(
    () => [
      {
        label: "Cancel",
        disabled: isPending,
        variant: "outline",
        onClick: () => navigate(ROUTES.ACCOUNTS.LIST),
      },
      {
        label: "Create Account",
        disabled: !isDirty,
        isLoading: isPending,
        onClick: () => handleSubmit(onSubmit)(),
      },
    ],
    [isPending, isDirty, navigate, handleSubmit, onSubmit],
  );

  return (
    <Create title="Create Account" card={card} actions={actions}>
      <Form {...form}>
        <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Description for this account (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div />
        </FormContainer>
      </Form>
    </Create>
  );
}
