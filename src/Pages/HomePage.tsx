import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { NavBar } from "@/components/NavBar";
import { SignoutDialog } from "@/components/Signout";
import { useState } from "react";

export default function HomePage() {
  const [SignoutDialogOpen, SetSignoutDialogOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <NavBar SetSignoutDialog={SetSignoutDialogOpen} />

      <SignoutDialog open={SignoutDialogOpen} setOpen={SetSignoutDialogOpen} />

      <div className=" w-full h-screen bg-slate-400">
        <h1 className="text-8xl font-bold mb-2">HOME PAGE</h1>
        <div className="flex flex-col items-center justify-center">
          <Button
            onClick={() => {
              SetSignoutDialogOpen(true);
            }}
          >
            Signout Dialog
          </Button>
        </div>
      </div>
    </>
  );
}
