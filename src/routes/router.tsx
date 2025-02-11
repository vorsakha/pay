import { Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "@/components/layouts/layout";
import { CreateAccounts } from "@/pages/account/create-account";
import { ListAccounts } from "@/pages/account/list-accounts";
import { ViewAccount } from "@/pages/account/view-account";
import { CreateCustomer } from "@/pages/customer/create-customer";
import { ListCustomers } from "@/pages/customer/list-customers";
import { CreateTransfer } from "@/pages/transfer-requests/create-transfer";
import { ListTransfers } from "@/pages/transfer-requests/list-transfers";
import { ROUTES } from "@/routes/routes";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={ROUTES.ACCOUNTS.LIST} replace />} />
        {/* Accounts */}
        <Route path={ROUTES.ACCOUNTS.LIST} element={<ListAccounts />} />
        <Route path={`${ROUTES.ACCOUNTS.VIEW}/:id`} element={<ViewAccount />} />
        <Route path={ROUTES.ACCOUNTS.CREATE} element={<CreateAccounts />} />

        {/* Customers */}
        <Route path={ROUTES.CUSTOMERS.LIST} element={<ListCustomers />} />
        <Route path={ROUTES.CUSTOMERS.CREATE} element={<CreateCustomer />} />

        {/* Transfer Requests */}
        <Route
          path={ROUTES.TRANSFER_REQUESTS.LIST}
          element={<ListTransfers />}
        />
        <Route
          path={ROUTES.TRANSFER_REQUESTS.CREATE}
          element={<CreateTransfer />}
        />
      </Route>
    </Routes>
  );
}
