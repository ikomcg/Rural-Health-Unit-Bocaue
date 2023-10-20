import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import { useContext, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserProvider } from "../../context/UserProvider";
import { db } from "../../firebase/Base";

const LandingPage = () => {
   const auth = getAuth();
   const navigate = useNavigate();
   const { saveCookies } = useContext(UserProvider);

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
