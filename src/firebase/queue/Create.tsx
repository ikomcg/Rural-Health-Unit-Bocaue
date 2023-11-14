import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Base";

export const CreateRequestQueueFrb = async ({ data,  }: Params) => {
   const docData = {
      ...data,
      created_at: serverTimestamp(),
   };

   return await addDoc(collection(db, "queue-list"), docData)
      .then((res) => {
         return res;
      })
      .catch(() => {
         return null;
      });
};
