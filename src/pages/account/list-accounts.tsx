import { Landmark, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { List } from "@/components/custom/list";
import { PageActions } from "@/components/custom/page";
import { useAccountsQuery } from "@/pages/account/hooks/use-accounts-query";
import { ROUTES } from "@/routes/routes";
import { formatMoney } from "@/utils/format";
import { getLastFourDigits } from "@/utils/string";

export function ListAccounts() {
  const navigate = useNavigate();
  const { data, isLoading } = useAccountsQuery();

  const actions: PageActions[] = [
    {
      label: "Create",
      children: (
        <>
          <Plus /> Create
        </>
      ),
      onClick: () => navigate(ROUTES.ACCOUNTS.CREATE),
    },
  ];

  return (
    <List title="Accounts" actions={actions} isLoading={isLoading}>
      {(data?.length || 0) > 0 ? (
        data?.map((item) => (
          <li
            key={item.id}
            className="flex gap-4 p-4 flex-col border-b border-border last:border-b-0"
          >
            <Link
              to={`${ROUTES.ACCOUNTS.VIEW}/${item.id}`}
              className="hover:opacity-70 hover:transition-all hover:duration-200"
            >
              <div className="text-start font-bold">{item.name}</div>

              <div className="w-full">
                <div className="flex flex-row gap-2 justify-between">
                  <p className="flex flex-row gap-2 text-sm items-center text-muted-foreground">
                    <Landmark />
                    {item.address === "PENDING"
                      ? "Pending Address"
                      : getLastFourDigits(item.address)}
                  </p>

                  <div className="flex flex-row gap-1 items-center">
                    <small>Balance:</small>
                    <strong>
                      {formatMoney(
                        item.balance.balance,
                        item.balance.tokenSymbol,
                      )}
                    </strong>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))
      ) : (
        <li className="flex gap-4 p-4 flex-col border-b border-border last:border-b-0">
          No accounts found.
        </li>
      )}
    </List>
  );
}
