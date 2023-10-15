import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";

type ScheduleType = {
   id: string | undefined;
};

const useFetchSchedulesService = ({ id }: ScheduleType) => {
   const [schedules, setSchedules] = useState<ScheduleService[] | null>();
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
            }) as unknown as ScheduleService[];
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
