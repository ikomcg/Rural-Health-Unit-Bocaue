import {
   collection,
   onSnapshot,
   or,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../../firebase/Base";
import { UserProvider } from "../../context/UserProvider";

const InboxFetch = (
   setActiveInbox: React.Dispatch<
      React.SetStateAction<Inbox | null | undefined>
   >
) => {
   const [inbox, setInbox] = useState<Inbox[] | null>();
   const { cookies } = useContext(UserProvider);

   useEffect(() => {
      const GetInbox = async () => {
         if (!cookies) return;
         try {
            const queryDb = query(
               collection(db, "inbox"),
               or(
                  where("to_id", "==", cookies.id),
                  where("from_id", "==", cookies.id)
               ),
               orderBy("update_at", "desc")
            );

            onSnapshot(
               queryDb,
               (snapshot) => {
                  const data = snapshot.docs.map((doc) => {
                     return {
                        id: doc.id,
                        created_at: doc.data().created_at.toDate(),
                        ...doc.data(),
                     };
                  }) as Inbox[];
                  setInbox(data);

                  if (data.length > 0) {
                     const _data = data[0];

                     setActiveInbox({
                        ..._data,
                     });
                  }
               },
               (error) => {
                  console.log(error);
                  setInbox(null);
               }
            );
         } catch (error) {
            console.log(error);
            setInbox(null);
         }
      };

      return () => {
         GetInbox();
      };
   }, []);

   return inbox;
};

export default InboxFetch;
