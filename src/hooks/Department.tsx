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
   const [queueLists, setQueueList] = useState<QueueList2[] | null>();

   const GetQueueLists = async () => {
      let queryDB = query(
         collection(db, "queue-list"),
         orderBy("created_at", "asc")
      );

      if (id) {
         queryDB = query(
            collection(db, "queue-list"),
            where("department", "==", id),
            orderBy("created_at", "asc")
         );
      }

      onSnapshot(
         queryDB,
         (snapshot) => {
            Promise.all(
               snapshot.docs.map(async (docu) => {
                  const data = docu.data() as QueueList;
                  const departmentRef = doc(db, "queue", data.department);
                  const department = await getDoc(departmentRef);
                  const dataDepartment = department.data() as ServiceType;

                  return {
                     ...data,
                     id: docu.id,
                     department: dataDepartment,
                     created_at: docu.data().created_at.toDate(),
                  };
               }) as unknown as QueueList2[]
            ).then((res) => {
               setQueueList(res);
            });
         },
         (err) => {
            console.log(err);
            setQueueList(null);
         }
      );
   };

   useEffect(() => {
      GetQueueLists();
   }, [id]);

   return queueLists;
};
