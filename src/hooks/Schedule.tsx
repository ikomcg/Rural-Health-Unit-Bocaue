import {
   and,
   collection,
   doc,
   getDoc,
   limit,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";

type ScheduleType = {
   id?: string;
};

const useFetchSchedulesService = ({ id }: ScheduleType) => {
   const [schedules, setSchedules] = useState<DoctorList[] | null>();
   useEffect(() => {
      if (!id) return;
      GetSchedules();
   }, [id]);

   const GetSchedules = async () => {
      if (!id) return;

      const queryDB = query(
         collection(db, `service`, id, "schedules"),
         orderBy("available_from", "asc")
      );
      onSnapshot(
         queryDB,
         (snapshot) => {
            const data = snapshot.docs.map((doc) => {
               return {
                  ...doc.data(),
                  id: doc.id,
                  available_from: doc.data().available_from.toDate(),
                  available_to: doc.data().available_to.toDate(),
               };
            }) as unknown as DoctorList[];
            setSchedules(data);
         },
         () => {
            setSchedules(null);
         }
      );
   };

   return schedules;
};

export default useFetchSchedulesService;

interface Schedule extends ScheduleType {
   _limit: number;
}
export const useFetchMySchedules = ({ id, _limit }: Schedule) => {
   const [schedules, setSchedules] = useState<RequestService[] | null>();

   useEffect(() => {
      if (!id) return;
      GetSchedules();
   }, [id]);

   const GetSchedules = async () => {
      if (!id) return;

      const queryDB = query(
         collection(db, "schedules"),
         and(where("patient_id", "==", id), where("status", "==", "approve")),
         orderBy("request_date", "asc"),
         limit(_limit)
      );
      onSnapshot(
         queryDB,
         (snapshot) => {
            Promise.all(
               snapshot.docs.map(async (docu) => {
                  const data = docu.data();
                  const ref = doc(db, "users", data.patient_id);

                  const docSnap = await getDoc(ref);
                  const _user = docSnap.data();

                  return {
                     ...data,
                     id: docu.id,
                     patient: _user,
                     request_date: data.request_date.toDate(),
                  };
               }) as unknown as RequestService[]
            ).then((res) => {
               const data = res.filter(
                  (item) => item.patient.account_status === "active"
               );
               setSchedules(data);
            });
         },
         () => {
            setSchedules(null);
         }
      );
   };

   return schedules;
};

export const useFetchAllSchedules = ({ _limit }: Schedule) => {
   const [schedules, setSchedules] = useState<RequestService[] | null>();

   useEffect(() => {
      GetSchedules();
   }, []);

   const GetSchedules = async () => {
      const queryDB = query(
         collection(db, "schedules"),
         where("status", "==", "approve"),
         limit(_limit)
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
                  const full_name = `${_user.first_name} ${_user.middle_name} ${_user.last_name}`;

                  return {
                     ...data,
                     id: docu.id,
                     patient: {
                        ..._user,
                        full_name,
                     },
                     request_date: data.request_date.toDate(),
                  };
               }) as unknown as RequestService[]
            ).then((res) => {
               const data = res.filter(
                  (item) => item.patient.account_status === "active"
               );
               setSchedules(data);
            });
         },
         () => {
            setSchedules(null);
         }
      );
   };

   return schedules;
};
