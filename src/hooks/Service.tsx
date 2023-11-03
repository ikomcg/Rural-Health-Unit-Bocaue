import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";

const useFetchService = () => {
   const [service, setService] = useState<ServiceType[] | null>();
   useEffect(() => {
      GetService();
   }, []);

   const GetService = async () => {
      const queryDB = query(
         collection(db, "service"),
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
            }) as unknown as ServiceType[];
            setService(data);
         },
         () => {
            setService(null);
         }
      );
   };

   return service;
};

export default useFetchService;
