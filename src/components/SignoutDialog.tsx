import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function SignoutDialog({ open, setOpen }) {
return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Signout Options</DialogTitle>
            <DialogDescription>Choose to signout this device or ALL devices signed into this Account.</DialogDescription>
          </DialogHeader>
          <div>
            <Button>Signout</Button>
            <Button variant="destructive">Signout ALL</Button>
          </div>
        </DialogContent> 
      </Dialog>
      
    </>
  );
}
