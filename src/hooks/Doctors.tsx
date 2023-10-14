import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";

const useFetchDoctors = () => {
   const [doctors, setDoctors] = useState<HealthWorkers[] | null>();
   useEffect(() => {
      GetSchedules();
   }, []);

   const GetSchedules = async () => {
      const queryDB = query(
         collection(db, `users`),
         where("role", "array-contains-any", ["doctor", "health_worker"])
      );
      onSnapshot(
         queryDB,
         (snapshot) => {
            const data = snapshot.docs.map((doc) => {
               const name = `${doc.data().first_name} ${
                  doc.data().middle_name
               } ${doc.data().last_name}`;
               return {
                  ...doc.data(),
                  name,
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
