import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LoaderCircle, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableInfinitePaginationProps {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

interface DataTableProps<T> {
  data?: T[];
  total?: number;
  columns: ColumnDef<T>[];
  pagination: DataTableInfinitePaginationProps;
  isLoading?: boolean;
}

export function DataTableInfinitePagination({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: DataTableInfinitePaginationProps) {
  return (
    <div className="flex justify-end mt-4">
      <Button
        onClick={fetchNextPage}
        disabled={!hasNextPage || isFetchingNextPage}
        variant="outline"
      >
        {isFetchingNextPage ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <Plus />
        )}{" "}
        Load More
      </Button>
    </div>
  );
}

function DataTableSkeleton({
  columns,
  length = 5,
}: {
  columns: number;
  length?: number;
}) {
  return (
    <TableBody>
      {Array.from({ length }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex} className="animate-pulse">
              <Skeleton className="flex-1 h-6 mx-2" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}

export function DataTable<T>({
  data = [],
  columns,
  pagination,
  isLoading = false,
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {isLoading ? (
            <DataTableSkeleton
              columns={columns.length}
              length={data.length || 5}
            />
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <DataTableInfinitePagination
        fetchNextPage={pagination.fetchNextPage}
        hasNextPage={pagination.hasNextPage}
        isFetchingNextPage={pagination.isFetchingNextPage}
      />
    </div>
  );
}
