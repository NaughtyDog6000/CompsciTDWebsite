import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import { AppContextProps, AppState, UserTypeEnum } from "./Structs/State";

import Page404 from "./Pages/Page404";
import HomePage from "./Pages/HomePage";
import Leaderboard from "./Pages/LeaderboardPage";
import DebugPage from "./Pages/Debug";
import { UseDarkMode } from "./main";
import { SignoutDialog } from "./components/Signout";
import SigninPage from "./Pages/Signin";
import { AuthRoute, SignedOutRoute } from "./lib/Routes";
import AdminPage from "./Pages/AdminPages/A_Overview";
import SignoutPage from "./Pages/SignoutPage";
import SignupPage from "./Pages/Signup";
import { Toaster } from "./components/ui/toaster";
import ProfilePage from "./Pages/ProfilePage";
import UserProfilePage from "./Pages/UserProfilePage";
import BlankTestPage from "./Pages/BlankTest";

export const AppContext = createContext<AppContextProps | undefined>(undefined);
const defaultAppState: AppState = {
  token: null,
  DebugMode: false,
  username: null,
  userType: UserTypeEnum.SignedOut,
  useDarkmode: true,
  SignoutDialogOpen: false,
};
export const APIURLContext = createContext<string | undefined>(undefined);

function App() {
  const [AppState, SetAppState] = useState<AppState>(defaultAppState);
  const [APIURL] = useState("https://api.robbiecornock.com");

  useEffect(() => {
    UseDarkMode(AppState.useDarkmode);
  }, [AppState.useDarkmode]);

  useEffect(() => {});
  return (
    <>
      {/* link preview stuff */}

      <AppContext.Provider value={{ AppState, SetAppState }}>
        <APIURLContext.Provider value={APIURL}>
          <SignoutDialog />
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
        </APIURLContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;
