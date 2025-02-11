import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useToast } from "@/hooks/use-toast";
import { Filters } from "@/models";
import {
  CustomerQueryKeys,
  CustomerService,
} from "@/services/customer.service";

const useCustomersQuery = (filters?: Filters) => {
  const { toast } = useToast();

  const { data, isLoading, isError } = useQuery({
    queryKey: [CustomerQueryKeys.list],
    queryFn: () => CustomerService.list(filters),
    throwOnError: (error: AxiosError<{ message: string }>) => {
      toast({
        title: "Error!",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Error fetching customers",
        variant: "destructive",
      });

      return !!error;
    },
  });

  return { data, isLoading, isError };
};

export { useCustomersQuery };
