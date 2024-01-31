import { useEffect } from "react";
import { messaging } from "../../../firebase/Base";
import { getToken } from "firebase/messaging";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";
const Layout = () => {
   const GetToken = async () => {
      const vapidKey =
         "BBzsG61OFxBiCuH6DlEOTBSCefgrJ1jKhc1MhQDGzbC4PXbPhIbkrymKqUAxzTsT4urUQ6en5W66j1KpcSJic7E";

      return await getToken(messaging, {
         vapidKey,
      })
         .then((currentToken) => {
            // eslint-disable-next-line no-console
            console.log("Token", currentToken);
            Swal.fire({icon :"info", text : currentToken})
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
