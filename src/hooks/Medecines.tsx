import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";

const useFetchMedecines = () => {
   const [medecines, setMedecines] = useState<MedecinesType[] | null>();
   useEffect(() => {
      GetMedecines();
   }, []);

   const GetMedecines = async () => {
      const queryDB = query(
         collection(db, "medecines"),
         orderBy("created_at", "desc")
      );
      onSnapshot(
         queryDB,
         (snapshot) => {
            const data = snapshot.docs.map((doc) => {
               const timestamp =
                  doc.data().created_at.seconds * 1000 +
                  Math.floor(doc.data().created_at.nanoseconds / 1e6);
               const created_at = new Date(timestamp);

               return {
                  ...doc.data(),
                  id: doc.id,
                  created_at,
               };
            }) as unknown as MedecinesType[];
            setMedecines(data);
         },
         (error) => {
            console.log("error Medecines", error);
            setMedecines(null);
         }
      );
   };

   return medecines;
};

export default useFetchMedecines;
