type RouteSegment = {
  LIST: string;
  CREATE: `${string}create`;
  VIEW?: `${string}view`;
};

type Routes = {
  HOME: string;
  TRANSFER_REQUESTS: RouteSegment;
  ACCOUNTS: RouteSegment;
  CUSTOMERS: RouteSegment;
};

const ROUTES: Routes = {
  HOME: "/",
  TRANSFER_REQUESTS: {
    LIST: "/transactions",
    CREATE: "/transactions/create",
    VIEW: "/transactions/view",
  },
  ACCOUNTS: {
    LIST: "/accounts",
    CREATE: "/accounts/create",
    VIEW: "/accounts/view",
  },
  CUSTOMERS: {
    LIST: "/customers",
    CREATE: "/customers/create",
  },
};

export { ROUTES };
