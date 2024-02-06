import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import {
  AppContextProps,
  AppState,
  CustomDialogContextProps,
  UserTypeEnum,
} from "./Structs/State";
import { UseDarkMode } from "./main";
import { SignoutDialog } from "./components/Signout";
import { AuthRoute, SignedOutRoute } from "./lib/Routes";
import { Toaster } from "./components/ui/toaster";
import { CustomDialog, CustomDialogProps } from "@/components/CustomDialog";
import { CompsciAPI } from "@/lib/APICALLS";

import Page404 from "./Pages/Misc/Page404";
import HomePage from "./Pages/HomePage";
import Leaderboard from "./Pages/LeaderboardPage";
import DebugPage from "./Pages/Misc/Debug";
import SigninPage from "./Pages/Signin";
import AdminPage from "./Pages/AdminPages/A_Overview";
import SignoutPage from "./Pages/Misc/SignoutPage";
import SignupPage from "./Pages/Signup";
import ProfilePage from "./Pages/SignedInExclusive/ProfilePage";
import UserProfilePage from "./Pages/UserProfilePage";
import BlankTestPage from "./Pages/Misc/BlankTest";

export const AppContext = createContext<AppContextProps | undefined>(undefined);
const defaultAppState: AppState = {
  DebugMode: true,
  username: null,
  userType: UserTypeEnum.SignedOut,
  useDarkmode: true,
  SignoutDialogOpen: false,
};
export const APIContext = createContext<CompsciAPI | undefined>(undefined);
const defaultAPIstate: CompsciAPI = new CompsciAPI(
  null,
  "https://api.robbiecornock.com"
);
export const CustomDialogContext = createContext<
  CustomDialogContextProps | undefined
>(undefined);

function App() {
  const [AppState, SetAppState] = useState<AppState>(defaultAppState);
  const [API] = useState<CompsciAPI>(defaultAPIstate);
  const [DialogQueue, SetDialogQueue] = useState<CustomDialogProps[]>([]);

  useEffect(() => {
    UseDarkMode(AppState.useDarkmode);
  }, [AppState.useDarkmode]);

  useEffect(() => {});
  return (
    <>
      <AppContext.Provider value={{ AppState, SetAppState }}>
        <APIContext.Provider value={API}>
          <CustomDialogContext.Provider
            value={{
              CustomDialogQueue: DialogQueue,
              SetCustomDialogQueue: SetDialogQueue,
            }}
          >
            <SignoutDialog />
            <CustomDialog />
            <Toaster />

            <BrowserRouter>
              <Routes>
                <Route path="*" element={<Page404 />} />
                <Route path="/" element={<HomePage />} />
                <Route
                  path="Signout"
                  element={
                    <AuthRoute>
                      <SignoutPage />
                    </AuthRoute>
                  }
                />
                <Route path="/Leaderboard" element={<Leaderboard />} />
                <Route path="/Debug" element={<DebugPage />} />

                <Route
                  path="/Signin"
                  element={
                    <SignedOutRoute fallbackPath="/Profile">
                      <SigninPage />
                    </SignedOutRoute>
                  }
                />
                <Route
                  path="/Signup"
                  element={
                    <SignedOutRoute fallbackPath="/Signout">
                      <SignupPage />
                    </SignedOutRoute>
                  }
                />

                <Route
                  path="/Admin"
                  element={
                    <AuthRoute
                      RequiredAuth={UserTypeEnum.Admin}
                      fallbackPath="/Signin"
                    >
                      <AdminPage />
                    </AuthRoute>
                  }
                />

                <Route
                  path="/Profile"
                  element={
                    <AuthRoute
                      RequiredAuth={UserTypeEnum.User}
                      fallbackPath="/Signin"
                    >
                      <ProfilePage />
                    </AuthRoute>
                  }
                />
                <Route path="/user/:username" element={<UserProfilePage />} />
                <Route path="/test" element={<BlankTestPage />} />
              </Routes>
            </BrowserRouter>
          </CustomDialogContext.Provider>
        </APIContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;
