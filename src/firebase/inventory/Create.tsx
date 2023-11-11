import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Base";

export const CreateInventoryFrb = async ({ data }: Params) => {
   const docData = {
      ...data,
      created_at: serverTimestamp(),
   };

   return await addDoc(collection(db, "inventory"), docData)
      .then((res) => {
         return res;
      })
      .catch(() => {

         return null;
      });
};
