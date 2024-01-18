import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import Page404 from "./Pages/Page404";
import HomePage from "./Pages/HomePage";
import Leaderboard from "./Pages/LeaderboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
