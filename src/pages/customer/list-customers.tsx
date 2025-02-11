import { Landmark, LoaderCircle, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { List } from "@/components/custom/list";
import { PageActions } from "@/components/custom/page";
import { useCustomersQuery } from "@/pages/customer/hooks/use-customers-query";
import { ROUTES } from "@/routes/routes";
import { formatMoney } from "@/utils/format";
import { getLastFourDigits } from "@/utils/string";

export function ListCustomers() {
  const navigate = useNavigate();
  const { data, isLoading } = useCustomersQuery();

  const actions: PageActions[] = [
    {
      label: "Create",
      children: (
        <>
          <Plus /> Create
        </>
      ),
      onClick: () => navigate(ROUTES.CUSTOMERS.CREATE),
    },
  ];

  return (
    <List title="Accounts" actions={actions} isLoading={isLoading}>
      {(data?.results.length || 0) > 0 ? (
        data?.results.map((item) => (
          <li
            key={item.id}
            className="flex gap-4 p-4 flex-col border-b border-border last:border-b-0"
          >
            <Link
              to={`${ROUTES.ACCOUNTS.VIEW}/${item.accountId}`}
              className={`hover:opacity-70 hover:transition-all hover:duration-200 ${
                item.status === "PENDING"
                  ? "pointer-events-none"
                  : "pointer-events-auto"
              }`}
              onClick={(e) => {
                if (item.status === "PENDING") {
                  e.preventDefault();
                }
              }}
            >
              <div className="text-start font-bold">{item.name}</div>

              <div className="w-full">
                <div className="flex flex-row gap-2 justify-between">
                  {item.status === "PENDING" ? (
                    <p className="flex flex-row items-center">
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Pending
                    </p>
                  ) : (
                    <p className="flex flex-row gap-2 text-sm items-center text-muted-foreground">
                      <Landmark />
                      {item.account?.address === "PENDING"
                        ? "Pending Address"
                        : getLastFourDigits(item.account?.address)}
                    </p>
                  )}

                  <div className="flex flex-row gap-1 items-center">
                    <small>Balance:</small>
                    <strong>
                      {formatMoney(
                        item.account?.balance.balance,
                        item.account?.balance.tokenSymbol,
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
          No customers found.
        </li>
      )}
    </List>
  );
}
