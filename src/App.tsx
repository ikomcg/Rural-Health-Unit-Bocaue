import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPageLayout from "./components/layout/LandingPage";
import LandingPage from "./page/LandingPage";
import AdminLayout from "./components/layout/admin/Layout";
import UnderConstructionLogo from "./components/logo/UnderConstructionLogo";
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
import PatientSchedule from "./page/patient/schedule/Schedule";
import AdminSchedule from "./page/admin/schedule/Schedule";
import Announcements from "./page/admin/announcements/Announcements";
import HealtWorkers from "./page/admin/health workers/HealtWorkers";
import Patient from "./page/admin/Patient/Patient";
import Messages from "./page/shared/message/Message";
import Inventory from "./page/admin/inventory/Inventory";
import Queue from "./page/patient/queue/Queue";
import ViewDepartment from "./page/patient/queue/view-department/ViewDepartment";

const App = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<LandingPageLayout />}>
               <Route index element={<LandingPage />} />
            </Route>
            <Route path="admin" element={<AdminLayout />}>
               <Route path="home" element={<HomeAdmin />} />
               <Route path="announcement" element={<Announcements />} />
               <Route path="inventory" element={<Inventory />} />
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
               <Route path="messages" element={<Messages />} />
               <Route path="schedule" element={<AdminSchedule />} />
               <Route path="health-worker" element={<HealtWorkers />} />
               <Route path="patient" element={<Patient />} />
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
               <Route path="schedule" element={<PatientSchedule />} />
               <Route path="messages" element={<Messages />} />
               <Route path="queueing">
                  <Route index element={<Queue />} />
                  <Route path=":name/:id" element={<ViewDepartment />} />
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

            <Route path="*" element={<>Page Not Found</>} />
         </Routes>
      </BrowserRouter>
   );
};

export default App;
