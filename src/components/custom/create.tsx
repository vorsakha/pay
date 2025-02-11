import { Page } from "@/components/custom/page";
import { ButtonProps } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface CreateHeaderProps {
  title: string;
  description?: string;
}

export interface CreateActions extends ButtonProps {
  label: string;
}

interface CreateProps {
  title: string;
  card: CreateHeaderProps;
  actions?: CreateActions[];
  children: React.ReactNode;
}

export function Create({ title, card, actions, children }: CreateProps) {
  return (
    <Page title={title} footerActions={actions}>
      <div className="w-full mx-auto flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>

          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </Page>
  );
}
