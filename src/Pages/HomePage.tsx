import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { NavBar } from "@/components/NavBar";
import { SignoutDialog } from "@/components/Signout";
import { useState } from "react";

export default function HomePage() {
  const [SignoutDialogOpen, SetSignoutDialogOpen] = useState(false);
  const [IsSignedIn, SetIsSignedIn] = useState(false);
  const [IsAdmin, SetIsAdmin] = useState(false);
  const [DebugMode, SetDebugMode] = useState(false);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <NavBar
        IsSignedIn={IsSignedIn}
        IsAdmin={IsAdmin}
        IsDebugmode={DebugMode}
        SetSignoutDialog={SetSignoutDialogOpen}
      />

      <SignoutDialog
        open={SignoutDialogOpen}
        setOpen={SetSignoutDialogOpen}
        setIsSignedIn={SetIsSignedIn}
      />

      <div className="w-full">
        <h1 className="h-auto text-8xl font-bold mb-2 mt-4">HOME PAGE</h1>
        <div className="flex flex-col items-center justify-center">
          <Button
            className="mb-1"
            onClick={() => {
              SetSignoutDialogOpen(true);
            }}
          >
            Signout Dialog
          </Button>

          <Button
            className="mb-1"
            onClick={() => {
              SetIsSignedIn(!IsSignedIn);
            }}
          >
            ToggleSignedIn
          </Button>

          <Button
            className="mb-1"
            onClick={() => {
              SetIsAdmin(!IsAdmin);
            }}
          >
            Toggle Admin
          </Button>
          <Button
            className="mb-1"
            onClick={() => {
              SetDebugMode(!DebugMode);
            }}
          >
            Toggle DebugMode
          </Button>
        </div>
      </div>
    </>
  );
}
