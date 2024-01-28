import { useAppState } from "@/Structs/State";

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
