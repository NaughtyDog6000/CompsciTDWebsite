import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { NavBar } from "@/components/NavBar";
import { SignoutDialog } from "@/components/Signout";
import { useState } from "react";
import { UserTypeEnum, useAppState } from "@/types/State";

export default function HomePage() {
  const [SignoutDialogOpen, SetSignoutDialogOpen] = useState(false);
  const [IsSignedIn, SetIsSignedIn] = useState(false);
  const [IsAdmin, SetIsAdmin] = useState(false);
  const [DebugMode, SetDebugMode] = useState(false);
  const { AppState, SetAppState } = useAppState();

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <NavBar SetSignoutDialog={SetSignoutDialogOpen} />

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

          <Button
            className="mb-1"
            onClick={() => {
              console.log(JSON.stringify(AppState));
            }}
          >
            LOG APP STATE
          </Button>

          <Button
            className="mb-1"
            onClick={() => {
              SetAppState({
                DebugMode: true,
                useDarkmode: true,
                username: "bbno$",
                userType: UserTypeEnum.Admin,
              });
            }}
          >
            SET ADMIN
          </Button>
        </div>
      </div>
    </>
  );
}
