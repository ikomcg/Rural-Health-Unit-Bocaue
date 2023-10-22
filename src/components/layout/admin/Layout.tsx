import SideBar from "./SideBar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Calendar from "../Calendar";
import style from "./style.module.scss";
import "../calendar.scss";
import { useContext, useEffect } from "react";
import { UserProvider } from "../../../context/UserProvider";
import { useState } from "react";
import Schedule from "./Schedule";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../../firebase/Base";
import { doc, onSnapshot } from "firebase/firestore";
import { SignOutFireBase } from "../../../firebase/SignOut";

const AdminLayout = () => {
   const { cookies, saveCookies } = useContext(UserProvider);
   const navigate = useNavigate();
   const url = window.location.pathname;
   const [isMenu, setIsMenu] = useState(true);
   const auth = getAuth();
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user) {
            const ref = doc(db, "users", user.uid);
            onSnapshot(
               ref,
               (snapshot) => {
                  if (!snapshot) return;

                  if (snapshot.exists()) {
                     const role = snapshot.data().role;
                     const is_verify = snapshot.data().is_verify;

                     if (role.includes("patient")) {
                        if (is_verify) {
                           const data = snapshot.data();
                           const cookie = {
                              ...data,
                              id: snapshot.id,
                           } as UserType;
                           if (cookie.role.includes("admin")) {
                              navigate("/admin/home");
                           } else {
                              navigate("/patient/home");
                           }
                           saveCookies(cookie);
                        }
                     } else {
                        SignOutFireBase();
                     }
                  } else {
                     console.log("No such document!");
                  }
               },
               (error) => {
                  console.log("snap err", error);
               }
            );
         } else {
            console.log("user not login");
            navigate("/");
         }
      });

      return () => unsubscribe();
   }, []);

   useEffect(() => {
      if (url === "/patient" && cookies) {
         navigate("/patient/home");
      }
   }, [url]);

   return !cookies ? (
      Navigate({ to: "/" })
   ) : (
      <div className={style.container}>
         <SideBar isMenu={isMenu} setIsMenu={setIsMenu} />
         <div
            className={`overflow-y-auto`}
            style={{
               width: isMenu ? "60%" : "80%",
            }}
         >
            <Outlet />
         </div>
         <div className="rgth_cldr w-[25%]">
            <Calendar />
            <Schedule />
         </div>
      </div>
   );
};

export default AdminLayout;
