import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserTypeEnum, useAppState } from "@/Structs/State";

export function SignoutDialog() {
  const { AppState, SetAppState } = useAppState();

  return (
    <>
      <Dialog
        open={AppState.SignoutDialogOpen}
        onOpenChange={(open: boolean) => {
          SetAppState({ ...AppState, SignoutDialogOpen: open });
        }}
      >
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
                console.warn("actual signout not completed");
                SetAppState({
                  ...AppState,
                  SignoutDialogOpen: false,
                  userType: UserTypeEnum.SignedOut,
                });
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
                console.warn("actual signout not completed");
                SetAppState({
                  ...AppState,
                  SignoutDialogOpen: false,
                  userType: UserTypeEnum.SignedOut,
                });
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
