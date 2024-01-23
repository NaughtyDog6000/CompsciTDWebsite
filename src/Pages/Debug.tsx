import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/NavBar";
import { DefaultAppState, useAppState } from "@/Structs/State";
export default function DebugPage() {
  const {AppState, SetAppState} = useAppState();
  return (
    <>
      <NavBar />

      <Button
        variant={"default"}
        onClick={() => {
          SetAppState(DefaultAppState)
        }}
      >
        Reset State
      </Button>
      <h1>DEBUGPAGE</h1>

        {
          Object.entries(AppState).map((entry) => (
            <p>
              {entry[0]}: {entry[1]}
            </p>
          ))
        }

    </>
  );
}
