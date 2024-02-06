import { CustomDialogContext } from "@/App";
import { NavBar } from "@/components/NavBar";
import { useContext } from "react";

export default function BlankTestPage(): JSX.Element {
  const DialogContext = useContext(CustomDialogContext);
  if (!DialogContext)
    throw new Error(
      "Dialog can only be used where the Dialog Context Provder is provided"
    );

  return (
    <>
      <NavBar />
      Test Page!
    </>
  );
}
