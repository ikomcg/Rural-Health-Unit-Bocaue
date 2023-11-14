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
type NewsFetchType = {
   id?: string;
};
const NewsFetch = ({ id }: NewsFetchType) => {
   const [news, setNews] = useState<AnnouncementType[] | null>();
   useEffect(() => {
      GetNews();
   }, []);

   const GetNews = async () => {
      let queryDB = query(
         collection(db, "announcements"),
         orderBy("created_at", "desc")
      );
      if (id) {
         queryDB = query(
            collection(db, "announcements"),
            where("user", "==", id),
            orderBy("created_at", "desc")
         );
      }

      onSnapshot(
         queryDB,
         (snapshot) => {
            Promise.all(
               snapshot.docs.map(async (docu) => {
                  const data = docu.data() as AnnouncementType;
                  const userRef = doc(db, "users", docu.data().user);
                  const docUser = await getDoc(userRef);
                  const userData = docUser.data() as UserType;
                  const full_name = `${userData.first_name} ${userData.middle_name} ${userData.last_name}`;

                  return {
                     ...data,
                     id: docu.id,
                     user: {
                        ...userData,
                        full_name,
                     },
                     created_at: data.created_at.toDate(),
                  };
               }) as unknown as AnnouncementType[]
            ).then((res) => {
               setNews(res);
            });
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
