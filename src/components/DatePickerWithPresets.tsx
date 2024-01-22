"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type DatePickerPreset = {
  name: string;
  value: number;
};
export const defaultDatePickerPresets: DatePickerPreset[] = [
  { name: "today", value: 0 },
  { name: "last 24 hours", value: -1 },
  { name: "last week", value: -7 },
  { name: "last year", value: -365 },
];

export function DatePickerWithPresets({
  CustomPresets = defaultDatePickerPresets,
}: {
  CustomPresets: DatePickerPreset[];
}): JSX.Element {
  const [date, setDate] = React.useState<Date>();
  const Presets = [];
  Presets.push(...CustomPresets);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <Select
          onValueChange={(value) => {
            console.log(value);
            const currentDate = new Date();
            const newDate = new Date(currentDate);
            const days = parseInt(value, 10);
            newDate.setDate(currentDate.getDate() + days);
            console.log(newDate);
            setDate(newDate);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            {Presets.map((preset) => (
              <SelectItem value={preset.value.toString()}>
                {preset.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
