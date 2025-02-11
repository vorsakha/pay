import { api } from "@/config/api";
import { Account } from "@/models/account/account.model";
import { AccountSchema } from "@/models/account/account.schema";

const AccountService = {
  create: async ({
    name,
    description,
    organizationCustomerId,
  }: AccountSchema) => {
    const response = await api.post<Account>("/accounts", {
      name,
      description,
      organizationCustomerId,
    });

    return response.data;
  },
  get: async ({ id }: { id: string }) => {
    const response = await api.get<Account>(`/accounts/${id}`);

    return response.data;
  },
  list: async () => {
    const response = await api.get<Account[]>("/accounts");

    return response.data;
  },
};

const AccountQueryKeys = {
  list: "account-list",
  get: "account-get",
};

export { AccountService, AccountQueryKeys };
