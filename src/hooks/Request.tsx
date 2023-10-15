import {
   and,
   collection,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";

type ParamsType = {
   id: string | undefined;
};

const useFetchRequest = ({ id }: ParamsType) => {
   const [requests, setRequests] = useState<RequestService[] | null>();
   useEffect(() => {
      if (!id) return;
      GetRequests();
   }, [id]);

   const GetRequests = async () => {
      if (!id) return;

      const queryDB = query(
         collection(db, `schedules`),
         where("service_id", "==", id),
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

type RerquestType = {
   user_id: string | undefined;
} & ParamsType;

export const useFetchMyRequestMedecine = ({ id, user_id }: RerquestType) => {
   const [requests, setRequests] = useState<RequestMedecines[] | null>();
   useEffect(() => {
      if (!id) return;
      GetRequests();
   }, [id]);

   const GetRequests = async () => {
      if (!id || !user_id) return;

      const queryDB = query(
         collection(db, `medecine_request`),
         and(where("service_id", "==", id), where("patient_id", "==", user_id))
      );
      onSnapshot(
         queryDB,
         (snapshot) => {
            const data = snapshot.docs.map((doc) => {
               return {
                  ...doc.data(),
                  id: doc.id,
               };
            }) as unknown as RequestMedecines[];
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

export const useFetchRequestMedecine = ({ id }: ParamsType) => {
   const [requests, setRequests] = useState<RequestMedecines[] | null>();
   useEffect(() => {
      if (!id) return;
      GetRequests();
   }, [id]);

   const GetRequests = async () => {
      if (!id) return;

      const queryDB = query(
         collection(db, `medecine_request`),
         where("service_id", "==", id),
         orderBy("created_at", "asc")
      );
      onSnapshot(
         queryDB,
         (snapshot) => {
            const data = snapshot.docs.map((doc) => {
               return {
                  ...doc.data(),
                  id: doc.id,
               };
            }) as unknown as RequestMedecines[];
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
