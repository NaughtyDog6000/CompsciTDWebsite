import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { NavBar } from "@/components/NavBar";
import { UserTypeEnum, useAppState } from "@/Structs/State";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
export default function HomePage() {
  const { AppState, SetAppState } = useAppState();

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <NavBar />

      <div className="w-full">
        <h1 className="h-auto text-8xl font-bold mb-2 mt-4">HOME PAGE</h1>
        <div className="flex flex-col items-center justify-center">
          <Button
            className="mb-1"
            onClick={() => {
              SetAppState({ ...AppState, SignoutDialogOpen: true });
            }}
          >
            Signout Dialog
          </Button>

          <Button
            className="mb-1"
            onClick={() => {
              if (AppState.userType >= UserTypeEnum.User) {
                SetAppState({ ...AppState, userType: UserTypeEnum.SignedOut });
              } else {
                SetAppState({ ...AppState, userType: UserTypeEnum.User });
              }
            }}
          >
            ToggleSignedIn
          </Button>

          <div className="flex items-center space-x-2">
            <Switch id="debug-switch" />
            <Label htmlFor="debug-switch">Debug?</Label>
          </div>

          <Button
            className="mb-1"
            onClick={() => {
              console.log(JSON.stringify(AppState));
            }}
          >
            LOG APP STATE
          </Button>

          <Button
            className="mb-1"
            onClick={() => {
              SetAppState({
                token: null,
                DebugMode: true,
                useDarkmode: true,
                username: "bbno$",
                userType: UserTypeEnum.Admin,
                SignoutDialogOpen: false,
              });
            }}
          >
            SET ADMIN
          </Button>
        </div>
      </div>
    </>
  );
}
