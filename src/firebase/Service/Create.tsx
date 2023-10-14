import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Base";

type CreateService = {
   data: {
      name: string;
      image: string;
   };
 
};

export const CreateServiceFrb = async ({ data,  }: CreateService) => {
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

export const CreateMedecineFrb = async ({ data,  }: CreateService) => {
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
 