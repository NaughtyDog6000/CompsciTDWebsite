import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SignoutDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
            <Button id="signout-single">Signout</Button>

            <span>signs out everything currently signed into your Account</span>
            <Button
              className="font-bold"
              id="signout-all"
              variant="destructive"
            >
              Signout EVERYTHING
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// export function SignoutButton() {
//   return (
//     <>
//       <Dialog>
//         <DialogTrigger asChild>
//           <Button variant={"default"}>Signout</Button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Signout Options</DialogTitle>
//             <DialogDescription>
//               Choose to signout this device or ALL devices signed into this
//               Account.
//             </DialogDescription>
//           </DialogHeader>
//           <div>
//             <Button>Signout</Button>
//             <Button variant="destructive">Signout ALL</Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }
