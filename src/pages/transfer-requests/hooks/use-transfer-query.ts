import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";

import { useToast } from "@/hooks/use-toast";
import {
  TransferRequestQueryKeys,
  TransferRequestService,
} from "@/services/transfer-request.service";

const useTransferQuery = () => {
  const params = useParams();
  const { toast } = useToast();

  const { data, isLoading, isError } = useQuery({
    queryKey: [TransferRequestQueryKeys.get, params.transactionId],
    enabled: !!params.transactionId,
    queryFn: () =>
      params.transactionId
        ? TransferRequestService.get({ id: params.transactionId })
        : Promise.reject(),
    throwOnError: (error: AxiosError<{ message: string }>) => {
      toast({
        title: "Error!",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Error fetching transfer",
        variant: "destructive",
      });

      return !!error;
    },
  });

  return {
    data,
    isLoading,
    isError,
  };
};

export { useTransferQuery };
