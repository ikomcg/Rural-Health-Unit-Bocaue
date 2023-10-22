import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Style.module.scss";
import Login from "../../page/login/Login";
import {
   getAuth,
   isSignInWithEmailLink,
   signInWithEmailLink,
} from "firebase/auth";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/Base";
import { TimeStampValue } from "../../shared/TimeStamp";
import { Backdrop, CircularProgress } from "@mui/material";

const Navbar = () => {
   const [open, setOpen] = useState(false);
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
            setOpen(false);
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
            setOpen(false);
            Swal.fire({
               icon: "error",
               title: err.code,
            });
         });
   };

   return (
      <>
         <div className="flex gap-3 w-1/3">
            <ul className="flex justify-between items-center w-full">
               <li>
                  <Link to="/home">Home</Link>
               </li>
               <li>
                  <Link to="/service">Service</Link>
               </li>
               <li>
                  <Link to="/about">About</Link>
               </li>
               <li>
                  <Link to="/contact-use">Contact us</Link>
               </li>
            </ul>
            <button
               className={style.button_sign_up}
               onClick={() => setOpen(true)}
            >
               Sign in
            </button>
         </div>
         <Login open={open} setOpen={setOpen} />
         <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
         >
            <CircularProgress color="inherit" />
         </Backdrop>
      </>
   );
};

export default Navbar;
