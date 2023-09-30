import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPageLayout from "./components/layout/LandingPage";
import LandingPage from "./page/LandingPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LandingPageLayout />}>
          <Route index element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
