import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";

const useFetchInventory = () => {
   const [inventory, setInventory] = useState<Inventory[] | null>();

   const GetInventory = async () => {
      const queryDB = query(
         collection(db, "inventory"),
         orderBy("created_at", "desc")
      );
      onSnapshot(
         queryDB,
         (snapshot) => {
            const data = snapshot.docs.map((doc) => {
               const timestamp =
                  doc.data().created_at.seconds * 1000 +
                  Math.floor(doc.data().created_at.nanoseconds / 1e6);
               const created_at = new Date(timestamp);

               const status = doc.data().availability > 100 ? "High" : "Low";

               return {
                  ...doc.data(),
                  id: doc.id,
                  status,
                  created_at,
               };
            }) as unknown as Inventory[];
            setInventory(data);
         },
         (error) => {
            console.log("error inventory", error);
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
