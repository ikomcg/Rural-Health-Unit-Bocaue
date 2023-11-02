import Header from "../header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import { useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/Base";
import { UserProvider } from "../../context/UserProvider";
import { SignOutFireBase } from "../../firebase/SignOut";

const LandingPage = () => {
   const auth = getAuth();
   const { saveCookies } = useContext(UserProvider);
   const navigate = useNavigate();

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user) {
            const ref = doc(db, "users", user.uid);
            onSnapshot(
               ref,
               (snapshot) => {
                  if (!snapshot) return;

                  if (snapshot.exists()) {
                     const data = snapshot.data();
                     const full_name = `${data.first_name} ${data.middle_name} ${data.last_name}`;
                     const role = data.role;
                     // for patient account
                     const is_verify = data.is_verify;
                     const cookie = {
                        full_name,
                        id: user.uid,
                        ...data,
                     } as UserType;

                     if (role.includes("patient")) {
                        if (is_verify) {
                           navigate("/patient/home");
                           saveCookies(cookie);
                        } else {
                           SignOutFireBase();

                           return false;
                        }
                     } else if (role.includes("admin")) {
                        navigate("/admin/home");
                        saveCookies(cookie);
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

   return (
      <div className="flex flex-col justify-between h-screen">
         <div>
            <Header />
            <Outlet />
         </div>
         <Footer />
      </div>
   );
};

export default LandingPage;
