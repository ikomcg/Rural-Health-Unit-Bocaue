import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Base";

type PayloadType = {
   id: string;
} & Params;

export const CreateServiceFrb = async ({ data, path }: Params) => {
   const docData = {
      ...data,
      created_at: serverTimestamp(),
   };

   if (!path) return null;

   return await addDoc(collection(db, path), docData)
      .then((res) => {
         return res;
      })
      .catch(() => {
         return null;
      });
};

export const CreateServiceScheduleFrb = async ({ data, id }: PayloadType) => {
   const docData = {
      ...data,
      created_at: serverTimestamp(),
   };

   return await addDoc(collection(db, "service", id, "schedules"), docData)
      .then((res) => {
         return res;
      })
      .catch(() => {
         return null;
      });
};

export const CreateMedecineFrb = async ({ data }: Params) => {
   const docData = {
      ...data,
      created_at: serverTimestamp(),
   };

   return await addDoc(collection(db, "medecines"), docData)
      .then((res) => {
         return res;
      })
      .catch(() => {
         return null;
      });
};

export const CreateMedecineListFrb = async ({ data, id }: PayloadType) => {
   const docData = {
      ...data,
      created_at: serverTimestamp(),
   };

   return await addDoc(collection(db, "medecines", id, "medecines"), docData)
      .then((res) => {
         return res;
      })
      .catch(() => {
         return null;
      });
};
