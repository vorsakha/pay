import { api, transferApi } from "@/config/api";
import { ListData } from "@/models";
import {
  TransferRequest,
  TransferRequestFilters,
} from "@/models/transfer-request/transfer-request.model";
import { TransferRequestSchema } from "@/models/transfer-request/transfer-request.schema";

const TransferRequestService = {
  list: async (params?: TransferRequestFilters) => {
    const response = await api.get<ListData<TransferRequest>>(
      "/transfer-requests",
      { params },
    );

    return response.data;
  },
  create: async ({
    payoutAccountId,
    memo,
    recipientsInfo,
  }: TransferRequestSchema) => {
    const response = await api.post<TransferRequest>("/transfer-requests", {
      payoutAccountId,
      memo,
      recipientsInfo,
    });

    return response.data;
  },
  get: async ({ id }: { id: string }) => {
    const response = await api.get<TransferRequest>(`/transfer-requests/${id}`);

    return response.data;
  },
  execute: async ({ transferRequestId }: { transferRequestId: string }) => {
    const response = await transferApi.post<TransferRequest>(
      `/transfer-requests/execute`,
      {
        transferRequestId,
      },
    );

    return response.data;
  },
  cancel: async ({ transferRequestId }: { transferRequestId: string }) => {
    const response = await transferApi.post<TransferRequest>(
      `/transfer-requests/cancel`,
      {
        transferRequestId,
      },
    );

    return response.data;
  },
};

const TransferRequestQueryKeys = {
  list: "transfer-request-list",
  get: "transfer-request-get",
};

export { TransferRequestService, TransferRequestQueryKeys };
