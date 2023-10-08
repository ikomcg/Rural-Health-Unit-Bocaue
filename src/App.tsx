import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPageLayout from "./components/layout/LandingPage";
import LandingPage from "./page/LandingPage";
import AdminLayout from "./components/layout/admin/Layout";
import UnderConstructionLogo from "./components/logo/UnderConstructionLogo";
import Announcement from "./page/Announcement/Announcement";

const App = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<LandingPageLayout />}>
               <Route index element={<LandingPage />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
               <Route path="announcement" element={<Announcement />} />

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
