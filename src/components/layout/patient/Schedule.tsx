import style from "./style.module.scss";
import { useContext, useEffect, useState } from "react";
import { UserProvider } from "../../../context/UserProvider";
import moment from "moment";
import {
   and,
   collection,
   limit,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import { db } from "../../../firebase/Base";

const Schedule = () => {
   const { cookies } = useContext(UserProvider);

   const [requests, setRequests] = useState<RequestService[] | null>();

   const GetRequests = async () => {
      if (!cookies) return;

      const queryDB = query(
         collection(db, "schedules"),
         and(where("patient_id", "==", cookies.id)),
         orderBy("request_date", "asc"),
         limit(4)
      );
      onSnapshot(
         queryDB,
         (snapshot) => {
            const data = snapshot.docs.map((doc) => {
               return {
                  ...doc.data(),
                  id: doc.id,
                  request_date: doc.data().request_date.toDate(),
               };
            }) as unknown as RequestService[];
            setRequests(data);
         },
         (error) => {
            console.log("error requests", error);
            setRequests(null);
         }
      );
   };

   useEffect(() => {
      GetRequests();
   }, []);

   return (
      <div className={style.schedules}>
         <h2>Schedules</h2>

         <ul>
            {requests === undefined ? (
               <li className="text-center text-slate-400">Loading....</li>
            ) : requests === null ? (
               <li className="text-center text-slate-400">
                  Error Get list Schedules
               </li>
            ) : (
               requests.map((item) => (
                  <li key={item.id} className="word-wrap line-clamp-1" title={item.service_name}>
                     {moment(item.request_date.toISOString())
                        .utcOffset(8)
                        .format("LLL")} - {item.service_name}
                  </li>
               ))
            )}
         </ul>
      </div>
   );
};

export default Schedule;
