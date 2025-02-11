import { ArrowLeft, Copy } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { View, ViewActions, ViewCardProps } from "@/components/custom/view";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Blockchain } from "@/models/transfer-request/transfer-request.model";
import { useAccountQuery } from "@/pages/account/hooks/use-account-query";
import { ROUTES } from "@/routes/routes";
import { formatMoney } from "@/utils/format";

const blockchainMapping: Record<Blockchain, string> = {
  ETHEREUM: "Ethereum",
  POLYGON: "Polygon",
  BASE: "Base",
  CELO: "Celo",
};

function HeaderSkeleton() {
  return (
    <>
      <Skeleton className="h-8 w-[70%]" />

      <Skeleton className="h-6 w-[20%] ml-[10%]" />
    </>
  );
}

function ContentSkeleton() {
  return (
    <>
      <p>Digital Wallet</p>

      <div className="grid gap-4">
        <Skeleton className="h-9 w-[500px]" />
        <Skeleton className="h-9 w-[200px]" />
        <Skeleton className="h-9 w-[180px]" />
      </div>
    </>
  );
}

export function ViewAccount() {
  const { data, isLoading } = useAccountQuery();
  const { toast } = useToast();
  const navigate = useNavigate();

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);

    toast({
      title: "Address copied to clipboard!",
      variant: "default",
    });
  };

  const card: ViewCardProps = useMemo(
    () => ({
      title: "Account Details",
      description: "Internal account details for deposits.",
    }),
    [],
  );

  const actions: ViewActions[] = useMemo(
    () => [
      {
        label: "All Accounts",
        onClick: () => navigate(ROUTES.ACCOUNTS.LIST),
        disabled: isLoading,
        variant: "outline",
        children: (
          <>
            <ArrowLeft /> All Accounts
          </>
        ),
        className: "w-fit",
      },
    ],
    [isLoading, navigate],
  );

  return (
    <View
      header={
        isLoading ? (
          <HeaderSkeleton />
        ) : (
          <>
            <h1>{data?.name}</h1>

            <div className="flex flex-row gap-1 items-center">
              <small>Balance</small>
              <strong>
                {formatMoney(data?.balance.balance, data?.balance.tokenSymbol)}
              </strong>
            </div>
          </>
        )
      }
      card={card}
      actions={actions}
    >
      {isLoading ? (
        <ContentSkeleton />
      ) : (
        <>
          <p>Digital Wallet</p>

          <div>
            <small>Address</small>
            {data?.address && (
              <div className="flex flex-row gap-2 items-center">
                <p>
                  {data.address === "PENDING"
                    ? "Pending Address"
                    : data.address}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyAddress(data.address)}
                >
                  <Copy className="mr-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <div>
            <small>Network</small>
            <p>{data && blockchainMapping[data.blockchain]}</p>
          </div>

          <div>
            <small>Currency</small>
            <p>{data?.balance.tokenSymbol}</p>
          </div>
        </>
      )}
    </View>
  );
}
