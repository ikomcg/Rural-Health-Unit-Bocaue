import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";

const useFetchDoctors = () => {
   const [doctors, setDoctors] = useState<HealthWorkers[] | null>();
   useEffect(() => {
      GetSchedules();
   }, []);

   const GetSchedules = async () => {
      const queryDB = query(collection(db, `doctors`));
      onSnapshot(
         queryDB,
         (snapshot) => {
            const data = snapshot.docs.map((doc) => {
               return {
                  ...doc.data(),
                  id: doc.id,
                  created_at: doc.data().created_at.toDate(),
               };
            }) as unknown as HealthWorkers[];
            setDoctors(data);
         },
         (error) => {
            console.log("error doctors", error);
            setDoctors(null);
         }
      );
   };

   return doctors;
};

export default useFetchDoctors;
