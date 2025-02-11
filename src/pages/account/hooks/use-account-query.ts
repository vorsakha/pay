import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";

import { useToast } from "@/hooks/use-toast";
import { AccountQueryKeys, AccountService } from "@/services/account.service";

const useAccountQuery = () => {
  const params = useParams();
  const { toast } = useToast();

  const { data, isLoading, isError } = useQuery({
    queryKey: [AccountQueryKeys.get, params.id],
    enabled: !!params.id,
    queryFn: () =>
      params.id ? AccountService.get({ id: params.id }) : Promise.reject(),
    throwOnError: (error: AxiosError<{ message: string }>) => {
      toast({
        title: "Error!",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Error fetching account",
        variant: "destructive",
      });

      return !!error;
    },
  });

  return { data, isLoading, isError };
};

export { useAccountQuery };
