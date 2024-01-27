import { useEffect } from "react";
import { messaging } from "../../../firebase/Base";
import { getToken } from "firebase/messaging";
import { Outlet } from "react-router-dom";

const Layout = () => {
   const GetFCM = async () => {
      Notification.requestPermission().then((res) => {
         if (res === "granted") {
            return getToken(messaging, {
               vapidKey:
                  "BBzsG61OFxBiCuH6DlEOTBSCefgrJ1jKhc1MhQDGzbC4PXbPhIbkrymKqUAxzTsT4urUQ6en5W66j1KpcSJic7E",
            })
               .then((currentToken) => {
                  alert(currentToken);
                  console.log("Token", currentToken);
               })
               .catch((err) => {
                  console.log("firebase:", err);
               });
         }
      });
   };

   useEffect(() => {
      GetFCM();
   }, []);
   return <Outlet />;
};

export default Layout;
