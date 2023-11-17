import {
   collection,
   doc,
   getDoc,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";

const useFetchMedecines = () => {
   const [medecines, setMedecines] = useState<MedecinesType[] | null>();
   useEffect(() => {
      GetMedecines();
   }, []);

   const GetMedecines = async () => {
      const queryDB = query(
         collection(db, "medecines"),
         orderBy("created_at", "desc")
      );
      onSnapshot(
         queryDB,
         (snapshot) => {
            const data = snapshot.docs.map((doc) => {
               return {
                  ...doc.data(),
                  id: doc.id,
                  created_at: doc.data().created_at.toDate(),
               };
            }) as unknown as MedecinesType[];
            setMedecines(data);
         },
         () => {
            setMedecines(null);
         }
      );
   };

   return medecines;
};

export default useFetchMedecines;

type ParamsType = {
   id: string | undefined;
};
export const useFetchMedecineListService = ({ id }: ParamsType) => {
   const [medecines, setMedecines] = useState<MedecineList[] | null>();
   useEffect(() => {
      if (!id) return;
      GetMedecinesList();
   }, [id]);

   const GetMedecinesList = async () => {
      if (!id) return;
      console.log(id);

      const queryDB = query(collection(db, `medecines`, id, "medecines"));
      onSnapshot(
         queryDB,
         (snapshot) => {
            Promise.all(
               snapshot.docs.map(async (docu) => {
                  const data = docu.data();
                  const inventory = doc(db, "inventory", data.medicine_id);
                  const medicine = await getDoc(inventory);

                  return {
                     ...data,
                     id: docu.id,
                     medicines: {
                        id: medicine.id,
                        ...medicine.data(),
                     },
                     created_at: data.created_at.toDate(),
                  };
               }) as unknown as MedecineList[]
            ).then((res) => {
               console.log(res);
               setMedecines(res);
            });
         },
         () => {
            setMedecines(null);
         }
      );
   };

   return medecines;
};
export const useFetchAdjustmentMedecineListService = ({ id }: ParamsType) => {
   const [medecines, setMedecines] = useState<MedecineAdjusmentList[] | null>();
   useEffect(() => {
      if (!id) return;
      GetMedecinesList();
   }, [id]);

   const GetMedecinesList = async () => {
      if (!id) return;

      const queryDB = query(
         collection(db, "medicine_adjustment"),
         where("service_id", "==", id)
      );
      onSnapshot(
         queryDB,
         (snapshot) => {
            Promise.all(
               snapshot.docs.map(async (docu) => {
                  const data = docu.data();
                  const inventory = doc(db, "inventory", data.medicine_id);
                  const medicine = await getDoc(inventory);

                  return {
                     ...data,
                     id: docu.id,
                     medicines: {
                        id: medicine.id,
                        ...medicine.data(),
                     },
                     created_at: data.created_at.toDate(),
                  };
               }) as unknown as MedecineAdjusmentList[]
            ).then((res) => {
               setMedecines(res);
            });
         },
         () => {
            setMedecines(null);
         }
      );
   };

   return medecines;
};
