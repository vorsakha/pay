import { api } from "@/config/api";
import { ListData } from "@/models";
import { Customer, CustomerFilters } from "@/models/customer/customer.model";
import { CustomerSchema } from "@/models/customer/customer.schema";

const CustomerService = {
  create: async ({ name, organizationType }: CustomerSchema) => {
    const response = await api.post<Customer>("/customers", {
      name,
      organizationType,
    });

    return response.data;
  },
  get: async ({ id }: { id: string }) => {
    const response = await api.get<Customer>(`/customers/${id}`);

    return response.data;
  },
  list: async (params?: CustomerFilters) => {
    const response = await api.get<ListData<Customer>>("/customers", {
      params,
    });

    return response.data;
  },
};

const CustomerQueryKeys = {
  list: "customer-list",
};

export { CustomerService, CustomerQueryKeys };
