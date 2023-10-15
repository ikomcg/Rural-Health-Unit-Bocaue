import {
   Timestamp,
   addDoc,
   collection,
   serverTimestamp,
} from "firebase/firestore";
import { db } from "../Base";

type CreateServiceSchedule = {
   data: {
      patient_id: string;
      patient_name: string;
      request_date: Timestamp;
      service_id: string;
      service_name: string;
      status: string;
   };
};

export const CreateRequestScheduleFrb = async ({
   data,
}: CreateServiceSchedule) => {
   const docData = {
      ...data,
      created_at: serverTimestamp(),
   };

   return await addDoc(collection(db, "schedules"), docData)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         console.log("error schedules", err);

         return null;
      });
};

type CreateRequestMedecine = {
   data: Omit<RequestMedecines, "id" | "created_at">;
};

export const CreateRequestMedecineFrb = async ({
   data,
}: CreateRequestMedecine) => {
   const docData = {
      ...data,
      created_at: serverTimestamp(),
   };

   return await addDoc(collection(db, "medecine_request"), docData)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         console.log("error request", err);

         return null;
      });
};
