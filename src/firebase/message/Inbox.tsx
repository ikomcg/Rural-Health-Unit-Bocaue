import {
   collection,
   doc,
   getDoc,
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
                  Promise.all(
                     snapshot.docs.map(async (docu) => {
                        const data = docu.data() as Inbox;
                        const ref = doc(db, "users", data.from_id);
                        const docSnap = await getDoc(ref);
                        const from_user = docSnap.data() as UserType;
                        const full_name_from = `${from_user.first_name} ${from_user.middle_name} ${from_user.last_name}`;

                        const ref2 = doc(db, "users", data.to_id);
                        const docSnap2 = await getDoc(ref2);
                        const to_user = docSnap2.data() as UserType;
                        const full_name_to = `${to_user.first_name} ${to_user.middle_name} ${to_user.last_name}`;
                        return {
                           ...data,
                           id: docu.id,
                           from_user: {
                              ...from_user,
                              full_name: full_name_from,
                           },
                           to_user: {
                              ...to_user,
                              full_name: full_name_to,
                           },
                           created_at: data.created_at.toDate(),
                        };
                     }) as unknown as Inbox[]
                  ).then((res) => {
                     setInbox(res);

                     if (res.length > 0) {
                        const _data = res[0];

                        setActiveInbox({
                           ..._data,
                        });
                     }
                  });
               },
               () => {
                  setInbox(null);
               }
            );
         } catch (error) {
            setInbox(null);
         }
      };

      GetInbox();
   }, []);

   return inbox;
};

export default InboxFetch;
