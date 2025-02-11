import { ReactNode } from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface ViewCardProps {
  title: string;
  description: string;
}

export interface ViewActions extends ButtonProps {
  label: string;
}

interface ViewProps {
  header: ReactNode;
  card: ViewCardProps;
  actions?: ViewActions[];
  children: ReactNode;
}

export function View({ header, card, actions, children }: ViewProps) {
  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="flex flex-row justify-between items-center h-12">
        {header}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{card.title}</CardTitle>

          <CardDescription>{card.description}</CardDescription>
        </CardHeader>

        <CardContent>{children}</CardContent>
      </Card>

      {actions?.map(({ label, children, ...action }) => (
        <Button key={label} type="button" {...action}>
          {children ? children : label}
        </Button>
      ))}
    </div>
  );
}
