import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function SignoutDialog({
  open,
  setOpen,
  setIsSignedIn,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Signout Options</DialogTitle>
            <DialogDescription>
              Choose to signout this device or ALL devices signed into this
              Account.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col">
            <span>signs out just this device</span>
            <Button
              id="signout-single"
              onClick={() => {
                setIsSignedIn(false);
                console.warn("actual signout not completed");
                setOpen(false);
              }}
            >
              Signout
            </Button>

            <span>signs out everything currently signed into your Account</span>
            <Button
              className="font-bold"
              id="signout-all"
              variant="destructive"
              onClick={() => {
                setIsSignedIn(false);
                console.warn("actual signout not completed");
                setOpen(false);
              }}
            >
              Signout EVERYTHING
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
