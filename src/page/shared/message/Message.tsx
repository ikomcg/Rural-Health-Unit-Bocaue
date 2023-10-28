import { useEffect, useState } from "react";
import Inbox from "./inbox/Inbox";
import Messages from "./messages/Messages";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase/Base";

const Message = () => {
   const [activeInbox, setActiveInbox] = useState<Inbox | null>();
   const [messages, setMessages] = useState<MessageType[] | null>();

   useEffect(() => {
      GetMessages();
   }, [activeInbox]);

   const GetMessages = async () => {
      if (!activeInbox) return;

      const queryDb = query(
         collection(db, "inbox", activeInbox.id, "messages"),
         orderBy("created_at", "asc")
      );
      onSnapshot(
         queryDb,
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
            }) as MessageType[];

            setMessages(data);
         },
         (error) => {
            console.log(error);
            setMessages(null);
         }
      );
   };

   return (
      <div className="flex flex-row h-screen">
         <Inbox activeInbox={activeInbox} setActiveInbox={setActiveInbox} />
         {activeInbox && (
            <>
               <Messages
                  activeInbox={activeInbox}
                  messages={messages}
                  setMessages={setMessages}
               />
            </>
         )}
      </div>
   );
};

export default Message;
