import { useContext, useEffect } from "react";
import HealthCondition from "./landing-page/HealthCondition";
import LivingHealthy from "./landing-page/Living_Healthy";
import Main from "./landing-page/Main";
import News from "./landing-page/News";
import Newsletter from "./landing-page/Newsletter";
import { doc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/Base";
import { useNavigate } from "react-router-dom";
import { UserProvider } from "../context/UserProvider";

const LandingPage = () => {
   const auth = getAuth();
   const navigate = useNavigate();
   const { saveCookies } = useContext(UserProvider);
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user) {
            console.log("user login", user);
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
