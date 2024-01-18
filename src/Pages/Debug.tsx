import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function DebugPage() {
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant={"default"}
        onClick={() => {
          navigate("/");
        }}
      >
        GO HOME
      </Button>
      <h1>DEBUGPAGE</h1>
    </>
  );
}
