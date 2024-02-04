import { Helmet } from "react-helmet";
import { NavBar } from "@/components/NavBar";

export default function SettingsPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Settings</title>
      </Helmet>

      <NavBar />

      <div className="w-full">
        <h1 className="h-auto text-8xl font-bold mb-2 mt-4">Settings Page</h1>
        <div className="flex flex-col items-center justify-center">
          {/* Profile Visibility */}
          {/* Change Password */}
          {/* Delete Account */}
          {/* Change Theme */}
          {/* Signout All users on account */}
          {/* Toggle Debug Mode */}
          {/* Report An Issue */}
        </div>
      </div>
    </>
  );
}
