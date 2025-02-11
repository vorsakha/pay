import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useToast } from "@/hooks/use-toast";
import { ListData } from "@/models";
import { TransferRequest } from "@/models/transfer-request/transfer-request.model";
import {
  TransferRequestQueryKeys,
  TransferRequestService,
} from "@/services/transfer-request.service";

interface InfiniteQuery<T> {
  pages: T[];
  nextId?: string;
}

const useTransfersQuery = () => {
  const { toast } = useToast();

  const {
    data,
    isLoading,
    isError,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    ListData<TransferRequest>,
    AxiosError<{ message: string }>,
    InfiniteQuery<ListData<TransferRequest>>,
    string[],
    string | undefined
  >({
    queryKey: [TransferRequestQueryKeys.list],
    queryFn: ({ pageParam }) =>
      TransferRequestService.list({ limit: 10, nextId: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage?.nextId != null ? String(lastPage.nextId) : undefined,
    initialPageParam: undefined,
    throwOnError: (error: AxiosError<{ message: string }>) => {
      toast({
        title: "Error!",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Error fetching transfers",
        variant: "destructive",
      });

      return !!error;
    },
  });

  return {
    data: data?.pages.flatMap((page) => page.results) || [],
    isLoading: isLoading || isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export { useTransfersQuery };
