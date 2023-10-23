import HealthCondition from "./landing-page/HealthCondition";
import LivingHealthy from "./landing-page/Living_Healthy";
import Main from "./landing-page/Main";
import News from "./landing-page/News";
import Newsletter from "./landing-page/Newsletter";
import {
   getAuth,
   isSignInWithEmailLink,
   signInWithEmailLink,
} from "firebase/auth";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/Base";
import { TimeStampValue } from "../shared/TimeStamp";
import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
const LandingPage = () => {
   const auth = getAuth();
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      const email = window.localStorage.getItem("emailForSignIn");

      if (isSignInWithEmailLink(auth, window.location.href)) {
         if (!email) return;
         setIsLoading(true);
         signInWithEmailLink(auth, email, window.location.href)
            .then((res) => {
               CreateUserInformation(res.user.uid);
            })
            .catch((error) => {
               Swal.fire({
                  icon: "error",
                  text: error.code,
               });
            });
      }
   }, []);

   const CreateUserInformation = async (uid: string) => {
      const ref = doc(db, "users", uid);
      const payload = window.localStorage.getItem("payload");

      if (!payload) return;
      const _payload: Register = JSON.parse(payload);
      const data = {
         ..._payload,
         age: Number(_payload.age),
         birthday: TimeStampValue(_payload.birthday),
         role: ["patient"],
         is_verify: false,
      };

      await setDoc(ref, data)
         .then(() => {
            Swal.fire({
               icon: "success",
               title: "Register Successfully",
               text: "Will send you a message once your account is verify",
            });
            window.localStorage.removeItem("emailForSignIn");
            window.localStorage.removeItem("payload");
            window.history.pushState(null, "", import.meta.env.VITE_LOCATION);
         })
         .catch((err) => {
            Swal.fire({
               icon: "error",
               title: err.code,
            });
         });
   };

   return (
      <>
         <Main />
         <section className="living-healthy-page">
            <LivingHealthy />
         </section>
         <section className="newsletter-page">
            <News />
         </section>
         <section className="subcription-page">
            <Newsletter />
         </section>
         <section className="health-condition">
            <HealthCondition />
         </section>
         <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
         >
            <CircularProgress color="inherit" />
         </Backdrop>
      </>
   );
};

export default LandingPage;
