import { NavBar } from "@/components/NavBar";
import { Helmet } from "react-helmet";

export default function ProfilePage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <NavBar />

      <h1 className="h-auto text-8xl font-bold mb-2 mt-4 break-words">
        Profile Page
      </h1>
    </>
  );
}
