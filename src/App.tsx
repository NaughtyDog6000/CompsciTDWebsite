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

export const AppContext = createContext<AppContextProps | undefined>(undefined);
const defaultAppState: AppState = {
  token: null,
  DebugMode: false,
  username: null,
  userType: UserTypeEnum.User,
  useDarkmode: true,
  SignoutDialogOpen: false,
};

function App() {
  const [AppState, SetAppState] = useState<AppState>(defaultAppState);

  useEffect(() => {
    UseDarkMode(AppState.useDarkmode);
  }, [AppState.useDarkmode]);

  useEffect(() => {});
  return (
    <AppContext.Provider value={{ AppState, SetAppState }}>
      <SignoutDialog />

      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<HomePage />} />
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
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
