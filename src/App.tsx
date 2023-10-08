import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPageLayout from "./components/layout/LandingPage";
import LandingPage from "./page/LandingPage";
import AdminLayout from "./components/layout/admin/Layout";
import UnderConstructionLogo from "./components/logo/UnderConstructionLogo";

const AdminHome = lazy(() => import("./page/admin/Home"));

const App = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<LandingPageLayout />}>
               <Route index element={<LandingPage />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
               <Route path="home" element={<AdminHome />} />

               <Route
                  path="*"
                  element={
                     <UnderConstructionLogo>
                        Under Development
                     </UnderConstructionLogo>
                  }
               />
            </Route>
            <Route
                  path="*"
                  element={
                     <UnderConstructionLogo>
                        Under Development
                     </UnderConstructionLogo>
                  }
               />
         </Routes>
      </BrowserRouter>
   );
};

export default App;
