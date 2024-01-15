import {
  Routes,
  Route,
  redirect,
  Navigate,
  BrowserRouter,
} from "react-router-dom";

import Page404 from "./Pages/Page404";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
