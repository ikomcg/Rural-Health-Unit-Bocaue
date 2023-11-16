import { Outlet, useNavigate } from "react-router-dom";
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
   const path = window.location.pathname;
   path;

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user) {
            const ref = doc(db, "users", user.uid);
            onSnapshot(
               ref,
               async (snapshot) => {
                  if (!snapshot) return;
                  if (snapshot.exists()) {
                     const data = snapshot.data();
                     const full_name = `${data.first_name} ${data.middle_name} ${data.last_name}`;
                     const role = data.role;
                     const is_verify = data.is_verify;
                     const cookie = {
                        ...data,
                        full_name,
                        id: user.uid,
                        birthday: data.birthday.toDate(),
                        created_at: data.created_at.toDate(),
                     } as UserType;

                     if (role.includes("patient")) {
                        if (is_verify) {
                           navigate("/patient/home");
                           saveCookies(cookie);
                        } else {
                           await SignOutFireBase();
                        }
                     } else if (role.includes("admin")) {
                        navigate("/admin/home");
                        saveCookies(cookie);
                     }
                  }
               },
               (error) => {
                  console.log("snap,", error);
               }
            );
         } else {
            navigate("/");
         }
      });
      return () => unsubscribe();
   }, []);

   return (
     <Outlet/>
   );
};

export default LandingPage;
