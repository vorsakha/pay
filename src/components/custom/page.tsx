import { Button, ButtonProps } from "@/components/ui/button";

export interface PageActions extends ButtonProps {
  label: string;
}

interface PageProps {
  title: string;
  headerActions?: PageActions[];
  footerActions?: PageActions[];
  children: React.ReactNode;
}

export function Page({
  title,
  headerActions,
  footerActions,
  children,
}: PageProps) {
  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="flex flex-row justify-between items-center h-12">
        <h1>{title}</h1>

        {headerActions?.map(({ label, children, ...action }) => (
          <Button key={label} type="button" {...action}>
            {children ? children : label}
          </Button>
        ))}
      </div>

      {children}

      <div className="flex justify-end gap-4 col-span-full">
        {footerActions?.map(({ label, children, ...action }) => (
          <Button key={label} type="button" {...action}>
            {children ? children : label}
          </Button>
        ))}
      </div>
    </div>
  );
}
