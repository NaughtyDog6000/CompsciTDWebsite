import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, createContext } from "react";
import { AppContextProps, AppState } from "./types/State";

import Page404 from "./Pages/Page404";
import HomePage from "./Pages/HomePage";
import Leaderboard from "./Pages/LeaderboardPage";
import DebugPage from "./Pages/Debug";

const AppContext = createContext<AppContextProps | undefined>(undefined);

function App() {
  const [state, setState] = useState<AppState | null>(null);
  return (
    <AppContext.Provider value={{ state, setState }}>
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
