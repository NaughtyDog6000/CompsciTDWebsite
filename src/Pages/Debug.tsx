import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { useAppState } from "@/Structs/State";
export default function DebugPage() {
  const navigate = useNavigate();
  const {AppState, SetAppState} = useAppState();
  return (
    <>
      <NavBar />

      <Button
        variant={"default"}
        onClick={() => {
          navigate("/");
        }}
      >
        GO HOME
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
