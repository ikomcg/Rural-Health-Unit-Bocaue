import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";
type useFetchServiceType = {
   path: string;
};
const useFetchService = ({ path }: useFetchServiceType) => {
   const [service, setService] = useState<ServiceType[] | null>();
   useEffect(() => {
      GetService();
   }, []);

   const GetService = async () => {
      const queryDB = query(
         collection(db, path),
         orderBy("created_at", "desc")
      );
      onSnapshot(
         queryDB,
         (snapshot) => {
            const data = snapshot.docs.map((doc) => {
               return {
                  ...doc.data(),
                  id: doc.id,
                  created_at: doc.data().created_at.toDate(),
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
