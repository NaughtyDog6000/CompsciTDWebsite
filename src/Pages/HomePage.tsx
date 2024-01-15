import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { Navbar } from "@/components/NavBar";
export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className=" w-screen h-screen bg-slate-400">
        <h1 className="text-8xl font-bold mb-2">HOME PAGE</h1>
        <div className="flex flex-col items-center justify-center">
          <Button variant={"default"}>Button</Button>
        </div>
      </div>
    </>
  );
}
