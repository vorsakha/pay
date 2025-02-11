import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useMemo } from "react";
import { DayPickerSingleProps } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateInputProps extends Omit<DayPickerSingleProps, "mode"> {
  value?: string | Date;
  onChange?: (date?: Date) => void;
  placeholder?: string;
}

export const InputDate = React.forwardRef<HTMLDivElement, DateInputProps>(
  (
    { value, onChange, placeholder, ...props },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ref,
  ) => {
    const dateValue = useMemo(() => {
      if (!value) return undefined;
      if (typeof value === "string") {
        const parsed = new Date(value);
        return isNaN(parsed.getTime()) ? undefined : parsed;
      }
      return value;
    }, [value]);

    return (
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "w-full pl-3 text-left font-normal",
                !dateValue && "text-muted-foreground",
              )}
            >
              {dateValue ? (
                format(dateValue, "PPP")
              ) : (
                <span>{placeholder || "Pick a date"}</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={onChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
            {...props}
          />
        </PopoverContent>
      </Popover>
    );
  },
);
