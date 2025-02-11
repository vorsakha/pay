import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useMemo } from "react";

import { useToast } from "@/hooks/use-toast";
import { AccountQueryKeys, AccountService } from "@/services/account.service";

const useAccountsQuery = () => {
  const { toast } = useToast();

  const { data, isLoading, isError } = useQuery({
    queryKey: [AccountQueryKeys.list],
    queryFn: () => AccountService.list(),
    throwOnError: (error: AxiosError<{ message: string }>) => {
      toast({
        title: "Error!",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Error fetching accounts",
        variant: "destructive",
      });

      return !!error;
    },
  });

  const getApprovedAccounts = useMemo(
    () => data?.filter((account) => account.isApiEnabled),
    [data],
  );

  return { data, isLoading, isError, getApprovedAccounts };
};

export { useAccountsQuery };
