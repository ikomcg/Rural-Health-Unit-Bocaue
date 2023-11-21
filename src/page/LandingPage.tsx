import {
   getAuth,
   isSignInWithEmailLink,
   signInWithEmailLink,
} from "firebase/auth";
import Swal from "sweetalert2";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase/Base";
import { TimeStampValue } from "../shared/TimeStamp";
import { useContext, useEffect } from "react";
import { UserProvider } from "../context/UserProvider";
import Login from "./login/Login";

const LandingPage = () => {
   const auth = getAuth();
   const { setLoading } = useContext(UserProvider);

   useEffect(() => {
      if (!isSignInWithEmailLink(auth, window.location.href)) return;

      const email = window.localStorage.getItem("emailForSignIn");

      if (!email) return;
      setLoading(true);

      const SignInWithEmailLink = async () => {
         await signInWithEmailLink(auth, email, window.location.href)
            .then((res) => {
               CreateUserInformation(res.user.uid);
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
         status: "offline",
         account_status: "active",
         created_at: serverTimestamp(),
      };

      await setDoc(ref, data)
         .then(() => {
            Swal.fire({
               icon: "success",
               title: "Register Successfully",
               text: "Will send you a message once your account is verify",
            });

            window.localStorage.removeItem("payload");
            window.localStorage.removeItem("email");
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
      <div className="flex flex-col md:flex-row md:justify-around items-center h-screen">
         <div className="flex flex-col items-center justify-center w-full md:w-1/2 px-5 mb-5 md:mb-0">
            <h1 className="text-blue text-4xl font-bold text-center">RURAL HEALTH UNIT</h1>
            <span>Bocaue Bulacan</span>
            <p className="text-xl text-center my-3">
               RURAL HEALTH UNIT provide medical advice, diagnosis, or
               treatment.
            </p>
         </div>
         <div className="flex justify-center w-full md:w-1/2 pb-5 md:pb-0">
            <Login />
         </div>
      </div>
   );
};

export default LandingPage;
