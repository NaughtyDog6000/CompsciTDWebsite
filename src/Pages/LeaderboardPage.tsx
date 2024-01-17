import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Leaderboard() {
  const [controlPanelEnabled, setControlPanelEnabled] = useState(false);

  return (
    <>
      <Helmet>
        <title>Leaderboard | compsci </title>
      </Helmet>

      <h1>Leaderboard Page</h1>

      <h2>PANEL</h2>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open Filters</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>TITLE</SheetTitle>
            <SheetDescription>
              Change what is shown on the Leaderboard and how it is ordered.
            </SheetDescription>
          </SheetHeader>
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            Radio for pub/friend/private Dropdown for number of records
          </div>

          <SheetFooter>
            <Button variant={"default"}>Apply</Button>
            <Button variant={"destructive"}>Reset</Button>
            <SheetClose asChild>
              <Button variant={"outline"}>Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
