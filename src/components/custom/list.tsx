import { Page, PageActions } from "@/components/custom/page";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ListProps {
  title: string;
  actions?: PageActions[];
  isLoading?: boolean;
  children: React.ReactNode;
}

function ListCustomersSkeleton() {
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

export function List({ title, actions, isLoading, children }: ListProps) {
  return (
    <Page title={title} headerActions={actions}>
      <Card>
        <CardContent className="p-2">
          {isLoading ? <ListCustomersSkeleton /> : <ul>{children}</ul>}
        </CardContent>
      </Card>
    </Page>
  );
}
