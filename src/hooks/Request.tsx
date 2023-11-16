import {
   doc,
   and,
   collection,
   getDoc,
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
            Promise.all(
               snapshot.docs.map(async (docu) => {
                  const data = docu.data();
                  const ref = doc(db, "users", data.patient_id);

                  const docSnap = await getDoc(ref);
                  const _user = docSnap.data() as UserType;
                  let full_name: string = "";
                  if (_user) {
                     full_name = `${_user.first_name} ${_user.middle_name} ${_user.last_name}`;
                  }
                  return {
                     ...data,
                     id: docu.id,
                     patient: { ..._user, full_name },
                     request_date: data.request_date.toDate(),
                  };
               }) as unknown as RequestService[]
            ).then((res) => {
               const data = res.filter(
                  (item) => item.patient.account_status === "active"
               );
               setRequests(data);
            });
         },
         (err) => {
            console.log(err);
            setRequests(null);
         }
      );
   };

   requests;

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
         collection(db, `medicine_request`),
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
         (err) => {
            console.log(err);
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
         collection(db, `medicine_request`),
         where("service_id", "==", id),
         orderBy("created_at", "asc")
      );
      onSnapshot(
         queryDB,
         (snapshot) => {
            Promise.all(
               snapshot.docs.map(async (docu) => {
                  const data = docu.data();
                  const ref = doc(db, "users", data.patient_id);
                  const docSnap = await getDoc(ref);
                  const _user = docSnap.data() as UserType;
                  let full_name: string = "";
                  if (_user) {
                     full_name = `${_user.first_name} ${_user.middle_name} ${_user.last_name}`;
                  }

                  return {
                     ...data,
                     id: docu.id,
                     patient: { ..._user, full_name },
                  };
               }) as unknown as RequestMedecines[]
            ).then((res) => {
               const data = res.filter(
                  (item) => item.patient.account_status === "active"
               );

               setRequests(data);
            });
         },
         (err) => {
            console.log(err);
            setRequests(null);
         }
      );
   };

   return requests;
};
