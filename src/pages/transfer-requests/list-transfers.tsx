import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, CircleX, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { DataTable } from "@/components/custom/data-table";
import { Page, PageActions } from "@/components/custom/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TransferRequest } from "@/models/transfer-request/transfer-request.model";
import { useTransferMutation } from "@/pages/transfer-requests/hooks/use-transfer-mutation";
import { useTransfersQuery } from "@/pages/transfer-requests/hooks/use-transfers-query";
import {
  badgeVariantMapping,
  statusMapping,
} from "@/pages/transfer-requests/utils/maps";
import { ROUTES } from "@/routes/routes";
import { formatDate, formatMoney } from "@/utils/format";

export function ListTransfersSkeleton() {
  return (
    <ul>
      {[1, 2, 3, 4, 5].map((item) => (
        <li
          key={item}
          className="flex gap-4 p-4 flex-col border-b border-border last:border-b-0"
        >
          <Skeleton className="h-14 w-full" />
        </li>
      ))}
    </ul>
  );
}

export function ListTransfers() {
  const navigate = useNavigate();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTransfersQuery();
  const {
    executeMutation,
    cancelMutation,
    isCancelPending,
    isExecutePending,
    mutationId,
  } = useTransferMutation();

  const actions: PageActions[] = [
    {
      label: "Create",
      children: (
        <>
          <Plus /> Create
        </>
      ),
      onClick: () => navigate(ROUTES.TRANSFER_REQUESTS.CREATE),
    },
  ];

  const columns: ColumnDef<TransferRequest>[] = [
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => <div>{formatDate(row.getValue("createdAt"))}</div>,
    },
    {
      accessorKey: "payoutAccountId",
      header: "Payout Account ID",
      cell: ({ row }) => {
        return <div>{row.getValue("payoutAccountId")}</div>;
      },
    },
    {
      accessorKey: "recipientsInfo",
      header: () => "Amount",
      cell: ({ row }) => {
        const recipientsInfo: { tokenAmount: number }[] =
          row.getValue("recipientsInfo");

        return <div>{formatMoney(recipientsInfo[0].tokenAmount)}</div>;
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => (
        <Badge
          className="flex items-center justify-center"
          variant={badgeVariantMapping[row.original.status]}
        >
          {statusMapping[row.original.status]}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-end">Actions</div>,
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            isLoading={isExecutePending && row.original?.id === mutationId}
            onClick={() => {
              executeMutation(row.original?.id || "");
            }}
            disabled={row.original?.status !== "IN_REVIEW"}
            icon={CheckCircle}
          >
            Approve
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => cancelMutation(row.original?.id || "")}
            disabled={row.original?.status !== "IN_REVIEW"}
            isLoading={isCancelPending && row.original?.id === mutationId}
            icon={CircleX}
          >
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Page title="Transfer Requests" headerActions={actions}>
      <DataTable<TransferRequest>
        data={data}
        columns={columns}
        isLoading={isLoading}
        pagination={{
          fetchNextPage,
          hasNextPage,
          isFetchingNextPage,
        }}
      />
    </Page>
  );
}
