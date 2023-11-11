import {
   and,
   collection,
   onSnapshot,
   or,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";

type ParamsType = {
   id: string | undefined;
};

type RerquestType = {
   user_id: string | undefined;
} & ParamsType;

const useFetchMyRequest = ({ id, user_id }: RerquestType) => {
   const [requests, setRequests] = useState<RequestService[] | null>();
   useEffect(() => {
      if (!id) return;
      GetRequests();
   }, [id, user_id]);

   const GetRequests = async () => {
      if (!id || !user_id) return;

      const queryDB = query(
         collection(db, "schedules"),
         and(
            where("patient_id", "==", user_id),
            or(where("service_id", "==", id))
         ),
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
         () => {
            setRequests(null);
         }
      );
   };

   return requests;
};

export default useFetchMyRequest;
