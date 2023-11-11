import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Base";
type RequestQueueType = {
   id: string;
} & Params;
export const CreateRequestQueueFrb = async ({ data, id }: RequestQueueType) => {
   const docData = {
      ...data,
      created_at: serverTimestamp(),
   };

   return await addDoc(collection(db, "queue", id, "queue-list"), docData)
      .then((res) => {
         return res;
      })
      .catch(() => {
         return null;
      });
};
