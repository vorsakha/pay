import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/hooks/use-toast";
import { CustomerSchema } from "@/models/customer/customer.schema";
import { ROUTES } from "@/routes/routes";
import {
  CustomerQueryKeys,
  CustomerService,
} from "@/services/customer.service";

const useCustomerMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CustomerSchema) => CustomerService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CustomerQueryKeys.list],
      });

      toast({
        title: "Customer created successfully!",
        variant: "default",
      });

      navigate(ROUTES.CUSTOMERS.LIST);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        title: "Error!",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Error creating customer",
        variant: "destructive",
      });
    },
  });

  return { mutate, isPending };
};

export { useCustomerMutation };
