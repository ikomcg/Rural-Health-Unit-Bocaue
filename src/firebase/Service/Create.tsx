import {
   Timestamp,
   addDoc,
   collection,
   serverTimestamp,
} from "firebase/firestore";
import { db } from "../Base";

type CreateService = {
   data: {
      name: string;
      image: string;
   };
};

export const CreateServiceFrb = async ({ data }: CreateService) => {
   const docData = {
      ...data,
      created_at: serverTimestamp(),
   };

   return await addDoc(collection(db, "service"), docData)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         console.log("error service", err);

         return null;
      });
};

type CreateServiceSchedule = {
   id: string;
   data: {
      id : string
      name: string;
      available_from: Timestamp;
      available_to: Timestamp;
   };
};

export const CreateServiceScheduleFrb = async ({
   data,
   id,
}: CreateServiceSchedule) => {
   const docData = {
      ...data,
      created_at: serverTimestamp(),
   };

   return await addDoc(collection(db, "service", id, "schedules"), docData)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         console.log("error service", err);

         return null;
      });
};

export const CreateMedecineFrb = async ({ data }: CreateService) => {
   const docData = {
      ...data,
      created_at: serverTimestamp(),
   };

   return await addDoc(collection(db, "medecines"), docData)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         console.log("error service", err);

         return null;
      });
};
