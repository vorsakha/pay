import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/hooks/use-toast";
import { TransferRequestSchema } from "@/models/transfer-request/transfer-request.schema";
import { ROUTES } from "@/routes/routes";
import {
  TransferRequestQueryKeys,
  TransferRequestService,
} from "@/services/transfer-request.service";

const useTransferMutation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [mutationId, setMutationId] = useState<string>("");

  const { mutate: executeMutation, isPending: isExecutePending } = useMutation({
    mutationFn: (transferRequestId: string) =>
      TransferRequestService.execute({ transferRequestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TransferRequestQueryKeys.list],
      });
      setMutationId("");

      toast({
        title: "Transfer Request executed successfully!",
        variant: "default",
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      setMutationId("");
      toast({
        title: "Error!",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Error executing transfer request",
        variant: "destructive",
      });
    },
    onMutate: (transferRequestId: string) => {
      setMutationId(transferRequestId);
    },
  });

  const { mutate: cancelMutation, isPending: isCancelPending } = useMutation({
    mutationFn: (transferRequestId: string) =>
      TransferRequestService.cancel({ transferRequestId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TransferRequestQueryKeys.list],
      });
      setMutationId("");

      toast({
        title: "Transfer Request cancelled successfully!",
        variant: "default",
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      setMutationId("");
      toast({
        title: "Error!",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Error canceling transfer request",
        variant: "destructive",
      });
    },
    onMutate: (transferRequestId: string) => {
      setMutationId(transferRequestId);
    },
  });

  const { mutate: createMutation, isPending: isCreatePending } = useMutation({
    mutationFn: (data: TransferRequestSchema) =>
      TransferRequestService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TransferRequestQueryKeys.list],
      });

      toast({
        title: "Transfer Request created successfully!",
        variant: "default",
      });

      navigate(ROUTES.TRANSFER_REQUESTS.LIST);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        title: "Error!",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Error creating transfer request",
        variant: "destructive",
      });
    },
  });

  return {
    executeMutation,
    cancelMutation,
    createMutation,
    mutationId,
    isCreatePending,
    isExecutePending,
    isCancelPending,
  };
};

export { useTransferMutation };
