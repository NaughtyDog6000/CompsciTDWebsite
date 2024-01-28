import { NavBar } from "@/components/NavBar";
import { Helmet } from "react-helmet";

export default function AdminPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <NavBar />

      <h1 className="w-full h-auto text-8xl font-bold mb-2 mt-4">
        Admin Dashboard
      </h1>

      <p className="text-red-500">Signout All Users</p>

      <p className="text-red-500">Delete Specific User</p>

      <p className="text-red-500">Disable Certain Pages</p>

      <p className="text-red-500">Disable Signup</p>

      <p className="text-red-500">Disable Signin</p>
    </>
  );
}
