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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CustomerSchema,
  customerSchema,
} from "@/models/customer/customer.schema";
import { useCustomerMutation } from "@/pages/customer/hooks/use-customer-mutation";
import { organizationTypeOptions } from "@/pages/customer/utils/options";
import { ROUTES } from "@/routes/routes";

export function CreateCustomer() {
  const navigate = useNavigate();
  const { mutate, isPending } = useCustomerMutation();

  const form = useForm<CustomerSchema>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: undefined,
      organizationType: undefined,
    },
  });
  const { isDirty } = form.formState;
  const { handleSubmit } = form;

  const onSubmit = useCallback(
    (values: CustomerSchema) => {
      mutate(values);
    },
    [mutate],
  );

  const card: CreateHeaderProps = useMemo(
    () => ({
      title: "Customer Info",
      description: "Create a new customer",
    }),
    [],
  );

  const actions: CreateActions[] = useMemo(
    () => [
      {
        label: "Cancel",
        disabled: isPending,
        variant: "outline",
        onClick: () => navigate(ROUTES.CUSTOMERS.LIST),
      },
      {
        label: "Create Customer",
        disabled: !isDirty,
        isLoading: isPending,
        onClick: () => handleSubmit(onSubmit)(),
      },
    ],
    [isPending, isDirty, navigate, handleSubmit, onSubmit],
  );

  return (
    <Create title="Create Customer" card={card} actions={actions}>
      <Form {...form}>
        <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Customer name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="organizationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the organization type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {organizationTypeOptions.map((org) => (
                        <SelectItem key={org.value} value={org.value}>
                          {org.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
