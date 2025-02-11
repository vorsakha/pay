import { api } from "@/config/api";
import { Banks } from "@/models/banks/banks.model";

const BanksService = {
  list: async ({ fiatCurrencyCodes }: { fiatCurrencyCodes: string[] }) => {
    const response = await api.get<Banks[]>(
      `/bank-accounts/get-bank-details-info?fiatCurrencyCodes=${fiatCurrencyCodes.join(
        "&fiatCurrencyCodes=",
      )}`,
    );

    return response.data;
  },
};

const BanksQueryKeys = {
  list: "banks-list",
};

export { BanksService, BanksQueryKeys };
