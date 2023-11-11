import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";
type List = {
   id?: string;
};
const useFetchDepartment = () => {
   const [department, setDepartment] = useState<ServiceType[] | null>();

   const GetService = async () => {
      const queryDB = query(
         collection(db, "queue"),
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

               return {
                  ...doc.data(),
                  id: doc.id,
                  created_at,
               };
            }) as unknown as ServiceType[];
            setDepartment(data);
         },
         () => {
            setDepartment(null);
         }
      );
   };

   useEffect(() => {
      GetService();
   }, []);

   return department;
};

export default useFetchDepartment;

export const useFetchQueueList = ({ id }: List) => {
   const [queueLists, setQueueList] = useState<QueueList[] | null>();

   const GetQueueLists = async () => {
      if (!id) return;
      const queryDB = query(
         collection(db, `queue`, id, "queue-list"),
         orderBy("created_at", "asc")
      );
      onSnapshot(
         queryDB,
         (snapshot) => {
            const data = snapshot.docs.map((doc) => {
               return {
                  id: doc.id,
                  created_at: doc.data().created_at.toDate(),
                  ...doc.data(),
               };
            }) as unknown as QueueList[];
            setQueueList(data);
         },
         () => {
            setQueueList(null);
         }
      );
   };

   useEffect(() => {
      GetQueueLists();
   }, [id]);

   return queueLists;
};
