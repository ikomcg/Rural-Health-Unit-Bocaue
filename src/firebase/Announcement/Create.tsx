import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Base";

type CreateAnnouncement = {
   data: CreateAnnouncementType;
};

export const CreateAnnouncementsFrb = async ({ data }: CreateAnnouncement) => {
   const docData = {
      ...data,
      created_at: serverTimestamp(),
   };

   return await addDoc(collection(db, "announcements"), docData)
      .then((res) => {
         return res;
      })
      .catch(() => {

         return null;
      });
};
