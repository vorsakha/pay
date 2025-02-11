import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useMemo } from "react";

import { useToast } from "@/hooks/use-toast";
import { BanksQueryKeys, BanksService } from "@/services/banks.service";

const useBanksQuery = (fiatCurrencyCodes?: string[]) => {
  const { toast } = useToast();

  const { data, isLoading, isError } = useQuery({
    queryKey: [BanksQueryKeys.list],
    enabled: !!fiatCurrencyCodes,
    queryFn: () =>
      fiatCurrencyCodes && BanksService.list({ fiatCurrencyCodes }),
    throwOnError: (error: AxiosError<{ message: string }>) => {
      toast({
        title: "Error!",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Error fetching banks",
        variant: "destructive",
      });

      return !!error;
    },
  });

  const options = useMemo(
    () =>
      data?.[0]?.bankNames.map((bankName) => ({
        value: bankName,
        label: bankName,
      })),
    [data],
  );

  return {
    data,
    isLoading,
    isError,
    options,
  };
};

export { useBanksQuery };
