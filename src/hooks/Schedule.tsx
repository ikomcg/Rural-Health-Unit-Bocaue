import {
   and,
   collection,
   limit,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";

type ScheduleType = {
   id: string | undefined;
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
         (error) => {
            console.log("error schedule", error);
            setSchedules(null);
         }
      );
   };

   return schedules;
};

export default useFetchSchedulesService;

interface MySchedule extends ScheduleType {
   _limit: number;
}
export const useFetchMySchedules = ({ id, _limit }: MySchedule) => {
   const [schedules, setSchedules] = useState<RequestService[] | null>();

   useEffect(() => {
      if (!id) return;
      GetSchedules();
   }, [id]);

   const GetSchedules = async () => {
      if (!id) return;

      const queryDB = query(
         collection(db, "schedules"),
         and(where("patient_id", "==", id), where("status", "==", "accept")),
         orderBy("request_date", "asc"),
         limit(_limit)
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
            setSchedules(data);
         },
         (error) => {
            console.log("error requests", error);
            setSchedules(null);
         }
      );
   };

   return schedules;
};
