/* eslint-disable @typescript-eslint/no-explicit-any */
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

                  const medicineReq = collection(db, "medicine_request");
                  const medicineReqItem = await getDocs(medicineReq);

                  const medAdjustment = collection(db, "medicine_adjustment");
                  const medAdjustmentItem = await getDocs(medAdjustment);

                  return {
                     ...data,
                     id: docu.id,
                     medecines,
                     medicines_request: medicineReqItem.docs.map((docu) => {
                        return {
                           ...docu.data(),
                           medicine: {
                              ...docu.data(),
                              id: docu.id,
                              created_at: docu.data()?.created_at.toDate(),
                           },
                           id: docu.id,
                        };
                     }),
                     medicine_adjustment: medAdjustmentItem.docs.map((docu) => {
                        return {
                           ...docu.data(),
                           id: docu.id,
                        };
                     }),
                     created_at: data.created_at.toDate(),
                  };
               }) as unknown as MedecinesReportsType[]
            ).then((res) => {
               console.log("new", res);
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
