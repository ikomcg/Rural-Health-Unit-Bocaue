import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";

type RerquestType = {
   id: string | undefined;
};

const useFetchRequest = ({ id }: RerquestType) => {
   const [requests, setRequests] = useState<RequestService[] | null>();
   useEffect(() => {
      if (!id) return;
      GetRequests();
   }, [id]);

   const GetRequests = async () => {
      if (!id) return;

      const queryDB = query(
         collection(db, `service`, id, "requests"),
         orderBy("request_date", "asc")
      );
      onSnapshot(
         queryDB,
         (snapshot) => {
            const data = snapshot.docs.map((doc) => {
               return {
                  ...doc.data(),
                  id: doc.id,
                  request_date: doc.data().request_date.toDate(),
               };
            }) as unknown as RequestService[];
            setRequests(data);
         },
         (error) => {
            console.log("error requests", error);
            setRequests(null);
         }
      );
   };

   return requests;
};

export default useFetchRequest;
