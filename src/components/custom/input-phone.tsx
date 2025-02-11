import * as React from "react";

import { cn } from "@/lib/utils";

const InputPhone = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, onChange, value, ...props }, ref) => {
  const formatPhone = (input: string): string => {
    let cleaned = input.replace(/[^\d+]/g, "");

    if (!cleaned.startsWith("+")) {
      cleaned = "+" + cleaned.replace(/\+/g, "");
    }
    cleaned = "+" + cleaned.slice(1).replace(/\+/g, "");

    const digits = cleaned.slice(1).replace(/\D/g, "");
    if (!digits) return "";

    if (digits.length === 11) {
      const country = digits.slice(0, 1);
      const area = digits.slice(1, 4);
      const firstPart = digits.slice(4, 7);
      const secondPart = digits.slice(7);
      return `+${country} (${area}) ${firstPart}-${secondPart}`;
    }

    const countryCode =
      digits.length <= 12 ? digits.slice(0, 2) : digits.slice(0, 3);
    const rest = digits.slice(countryCode.length);
    const groups = rest.match(/.{1,3}/g) || [];
    return `+${countryCode} ${groups.join(" ")}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedValue = formatPhone(inputValue);

    onChange?.({
      ...event,
      target: {
        ...event.target,
        value: formattedValue,
      },
    });
  };

  return (
    <input
      type="text"
      ref={ref}
      value={value}
      onChange={handleChange}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});

InputPhone.displayName = "InputPhone";

export { InputPhone };
