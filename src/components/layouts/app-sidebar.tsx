import {
  BadgeDollarSign,
  Coins,
  LucideProps,
  SquareUser,
  WalletMinimal,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/routes/routes";

interface SidebarItem {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "Accounts",
    url: ROUTES.ACCOUNTS.LIST,
    icon: WalletMinimal,
  },
  {
    title: "Customers",
    url: ROUTES.CUSTOMERS.LIST,
    icon: SquareUser,
  },
  {
    title: "Transfer Requests",
    url: ROUTES.TRANSFER_REQUESTS.LIST,
    icon: BadgeDollarSign,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          to={ROUTES.HOME}
          className="flex items-center justify-center text-5xl text-primary font-mono p-2 hover:opacity-70 transition-all duration-200"
        >
          <span className="inline-flex items-center gap-1">
            <Coins className="mr-[-10px] w-11 h-11" /> PAY
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname.includes(item.url)}
                  >
                    <Link to={item.url}>
                      <item.icon className="text-primary" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
