import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, createContext } from "react";
import { AppContextProps, AppState, UserTypeEnum } from "./types/State";

import Page404 from "./Pages/Page404";
import HomePage from "./Pages/HomePage";
import Leaderboard from "./Pages/LeaderboardPage";
import DebugPage from "./Pages/Debug";

export const AppContext = createContext<AppContextProps | undefined>(undefined);
const defaultAppState: AppState = {
  DebugMode: false,
  username: null,
  userType: UserTypeEnum.User,
  useDarkmode: true,
};

function App() {
  const [AppState, SetAppState] = useState<AppState>(defaultAppState);
  return (
    <AppContext.Provider value={{ AppState, SetAppState }}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/Leaderboard" element={<Leaderboard />} />
          <Route path="/Debug" element={<DebugPage />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
