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
                  "BHHZG56KgOZ1Ub_zZKt6Iu9RUY9MoMKsrkXAKN6b6DUbGPbN320nvAPMk7xPy1uAfrkp791poW3Docpwm-XWENk",
            })
               .then((currentToken) => {
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
