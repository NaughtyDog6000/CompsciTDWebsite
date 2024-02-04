import { useAppState } from "@/Structs/State";

// this page exists so that if the user goes to /Signout or if I wish to create a full Signout Options page, I can.

export default function SignoutPage(): JSX.Element {
  const { AppState, SetAppState } = useAppState();
  if (AppState.SignoutDialogOpen === false) {
    SetAppState({ ...AppState, SignoutDialogOpen: true });
  }
  return (
    <>
      <div className="flex flex-col w-full h-full justify-center">
        <h1 className="flex w-full h-auto text-8xl font-extrabold justify-center ">
          SIGNOUT
        </h1>
      </div>
    </>
  );
}
