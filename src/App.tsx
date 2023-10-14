import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPageLayout from "./components/layout/LandingPage";
import LandingPage from "./page/LandingPage";
import AdminLayout from "./components/layout/admin/Layout";
import UnderConstructionLogo from "./components/logo/UnderConstructionLogo";
import Announcement from "./page/admin/Announcement/Announcement";
import Home from "./page/admin/home/Home";
import HomeAdmin from "./page/admin/home/Home";
import ServiceMedicine from "./page/admin/service-medicine/ServiceMedicine";
import HealthService from "./page/admin/service-medicine/health service/Health Service";
import Medicines from "./page/admin/service-medicine/medecines/Medecines";
import ViewService from "./page/admin/service-medicine/health service/view-service/View";

const App = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<LandingPageLayout />}>
               <Route index element={<LandingPage />} />
            </Route>
            <Route path="admin" element={<AdminLayout />}>
               <Route path="home" element={<HomeAdmin />} />
               <Route path="announcement" element={<Announcement />} />
               <Route path="service-medicine" element={<ServiceMedicine />}>
                  <Route path="health-services">
                     <Route index element={<HealthService />} />
                     <Route path=":name/:id" element={<ViewService />} />
                  </Route>

                  <Route path="medicines" element={<Medicines />} />
               </Route>

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
