import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";

export default function DebugPage() {
  const navigate = useNavigate();
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
      <h2>testsiod</h2>
    </>
  );
}
