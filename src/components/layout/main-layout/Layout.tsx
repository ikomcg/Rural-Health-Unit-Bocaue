import { useEffect } from "react";
import { messaging } from "../../../firebase/Base";
import { getToken } from "firebase/messaging";
import { Outlet } from "react-router-dom";
const Layout = () => {
   
   const GetToken = async () => {
      const vapidKey =
         "BBzsG61OFxBiCuH6DlEOTBSCefgrJ1jKhc1MhQDGzbC4PXbPhIbkrymKqUAxzTsT4urUQ6en5W66j1KpcSJic7E";

      return await getToken(messaging, {
         vapidKey,
      })
         .then((currentToken) => {
            console.log("Token", currentToken);
         })
         .catch((err) => err);
   };

   const CheckNotificationPermission = async () => {
      if (!("Notification" in window)) return;

      if (Notification.permission === "granted") {
         GetToken();
      } else if (Notification.permission !== "denied") {
         Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
               GetToken();
            }
         });
      }
   };

   useEffect(() => {
      CheckNotificationPermission();
   }, []);

   return <Outlet />;
};

export default Layout;
