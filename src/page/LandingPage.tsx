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
import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { UserProvider } from "../context/UserProvider";

const LandingPage = () => {
   const auth = getAuth();
   // const navigate = useNavigate();
   const { setLoading } = useContext(UserProvider);

   useEffect(() => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
         const email = window.localStorage.getItem("emailForSignIn");

         if (!email) return;
         setLoading(true);

         const SignInWithEmailLink = async () => {
            await signInWithEmailLink(auth, email, window.location.href)
               .then((res) => {
                  return CreateUserInformation(res.user.uid);
               })
               .catch((error) => {
                  setLoading(false);
                  Swal.fire({
                     icon: "error",
                     text: error.code,
                  });
               });
         };

         SignInWithEmailLink();
      }

      //    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //       if (user) {
      //          const ref = doc(db, "users", user.uid);
      //          onSnapshot(
      //             ref,
      //             (snapshot) => {
      //                if (!snapshot) return;

      //                if (snapshot.exists()) {
      //                   const data = snapshot.data();
      //                   // for patient account
      //                   const is_verify = data.is_verify;
      //                   const cookie = {
      //                      ...data,
      //                      id: user.uid,
      //                   } as UserType;

      //                   if (role.includes("patient")) {
      //                      if (is_verify) {
      //                         saveCookies(cookie);
      //                         return cookie;
      //                      } else {
      //                         setOpen(false);
      //                         Swal.fire({
      //                            icon: "info",
      //                            title: "Account not Verify",
      //                            text: "Contact Rural Health Unit to verify your account",
      //                         });

      //                         return false;
      //                      }
      //                   } else if (role.includes("admin")) {
      //                      saveCookies(cookie);
      //                      return cookie;
      //                   }

      //                   if (cookie.role.includes("admin")) {
      //                      navigate("/admin/home");
      //                   } else {
      //                      navigate("/patient/home");
      //                   }

      //                   saveCookies(cookie);
      //                } else {
      //                   console.log("No such document!");
      //                }
      //             },
      //             (error) => {
      //                console.log("snap err", error);
      //             }
      //          );
      //       } else {
      //          console.log("user not login");
      //          navigate("/");
      //       }
      //    });
      //    return () => unsubscribe();
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
      setLoading(false);
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
      </>
   );
};

export default LandingPage;
