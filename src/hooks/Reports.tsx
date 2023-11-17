import {
   collection,
   doc,
   getDoc,
   getDocs,
   onSnapshot,
   orderBy,
   query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";

export const useFetchReports = () => {
   const [reports, setReports] = useState<MedecinesReportsType[] | null>();
   useEffect(() => {
      GeReports();
   }, []);

   const GeReports = async () => {
      const queryDB = query(
         collection(db, "medecines"),
         orderBy("created_at", "desc")
      );
      onSnapshot(
         queryDB,
         (snapshot) => {
            Promise.all(
               snapshot.docs.map(async (docu) => {
                  const data = docu.data();
                  const ref = collection(db, "medecines", docu.id, "medecines");
                  const medicineList = await getDocs(ref);

                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  let medecines: any;

                  await Promise.all(
                     medicineList.docs.map(async (docu) => {
                        const inventory = doc(
                           db,
                           "inventory",
                           docu.data().medicine_id
                        );
                        const inventoryItem = await getDoc(inventory);

                        return {
                           ...docu.data(),
                           medicine: {
                              ...inventoryItem.data(),
                              id: inventory.id,
                              created_at: inventoryItem
                                 .data()
                                 ?.created_at.toDate(),
                           },
                           id: docu.id,
                        };
                     })
                  ).then((res) => {
                     medecines = res;
                  });

                  return {
                     ...data,
                     id: docu.id,
                     medecines,
                     created_at: data.created_at.toDate(),
                  };
               }) as unknown as MedecinesReportsType[]
            ).then((res) => {
               console.log(res);
               setReports(res);
            });
         },
         () => {
            setReports(null);
         }
      );
   };

   return reports;
};
