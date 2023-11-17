import {
   collection,
   doc,
   getDoc,
   onSnapshot,
   orderBy,
   query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";

const useFetchInventory = () => {
   const [inventory, setInventory] = useState<InventoryList[] | null>();

   const GetInventory = async () => {
      const queryDB = query(
         collection(db, "inventory"),
         orderBy("created_at", "desc")
      );
      onSnapshot(
         queryDB,
         (snapshot) => {
            Promise.all(
               snapshot.docs.map(async (docu) => {
                  const data = docu.data();
                  const userRef = doc(db, "medecines", docu.data().category);
                  const categorys = await getDoc(userRef);

                  return {
                     ...data,
                     id: docu.id,
                     category: {
                        id: categorys.id,
                        ...categorys.data(),
                     },
                     created_at: data.created_at.toDate(),
                  };
               }) as unknown as InventoryList[]
            ).then((res) => {
               console.log(res);
               setInventory(res);
            });
         },
         (err) => {
            console.log(err);
            setInventory(null);
         }
      );
   };

   useEffect(() => {
      GetInventory();
   }, []);

   return inventory;
};

export default useFetchInventory;
