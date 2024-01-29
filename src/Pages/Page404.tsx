import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
export default function Page404() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Compsci TD</title>
      </Helmet>
      <h1 className="h-auto text-8xl font-bold mb-2 mt-4 break-words">
        Page not found :(
      </h1>

      <Button asChild>
        <Link to="/">Return Home</Link>
      </Button>
    </>
  );
}
