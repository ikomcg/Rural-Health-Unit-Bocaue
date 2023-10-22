import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPageLayout from "./components/layout/LandingPage";
import LandingPage from "./page/LandingPage";
import AdminLayout from "./components/layout/admin/Layout";
import UnderConstructionLogo from "./components/logo/UnderConstructionLogo";
import Announcement from "./page/admin/announcement/Announcement";
import HomeAdmin from "./page/admin/home/Home";
import ServiceMedicine from "./page/admin/service-medicine/ServiceMedicine";
import HealthService from "./page/admin/service-medicine/health service/Health Service";
import Medicines from "./page/admin/service-medicine/medecines/Medecines";
import ViewService from "./page/admin/service-medicine/health service/view-service/View";
import HomePatient from "./page/patient/home/Home";
import PatientLayout from "./components/layout/patient/Layout";
import PatientServiceMedicine from "./page/patient/service-medicine/ServiceMedicine";
import PatientHealthService from "./page/patient/service-medicine/health service/Health Service";
import PatientViewService from "./page/patient/service-medicine/health service/view-service/View";
import PatientMedicines from "./page/patient/service-medicine/medecines/Medecines";
import MedecinesViewService from "./page/admin/service-medicine/medecines/view-service/View";
import PatientViewMedecines from "./page/patient/service-medicine/medecines/view-service/View";
import Schedule from "./page/patient/schedule/Schedule";

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

                  <Route path="medicines">
                     <Route index element={<Medicines />} />
                     <Route
                        path=":name/:id"
                        element={<MedecinesViewService />}
                     />
                  </Route>
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
            <Route path="patient" element={<PatientLayout />}>
               <Route path="home" element={<HomePatient />} />
               <Route
                  path="service-medicine"
                  element={<PatientServiceMedicine />}
               >
                  <Route path="health-services">
                     <Route index element={<PatientHealthService />} />
                     <Route path=":name/:id" element={<PatientViewService />} />
                  </Route>

                  <Route path="medicines">
                     <Route index element={<PatientMedicines />} />
                     <Route
                        path=":name/:id"
                        element={<PatientViewMedecines />}
                     />
                  </Route>
               </Route>
               <Route path="schedule" element={<Schedule />} />
               <Route
                  path="*"
                  element={
                     <UnderConstructionLogo>
                        Under Development
                     </UnderConstructionLogo>
                  }
               />
            </Route>

            <Route path="*" element={<>Page Not Found</>} />
         </Routes>
      </BrowserRouter>
   );
};

export default App;
