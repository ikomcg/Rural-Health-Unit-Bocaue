import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";

const NewsFetch = () => {
   const [news, setNews] = useState<AnnouncementType[] | null>();
   useEffect(() => {
      GetNews();
   }, []);

   const GetNews = async () => {
      const queryDB = query(
         collection(db, "announcements"),
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
            }) as AnnouncementType[];
            setNews(data);
         },
         () => {
            setNews(null);
         }
      );
   };

   return {
      news,
   };
};

export default NewsFetch;
