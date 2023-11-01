import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Base";

export const CreateRequestScheduleFrb = async ({ data }: Params) => {
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

export const CreateRequestMedecineFrb = async ({ data }: Params) => {
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
