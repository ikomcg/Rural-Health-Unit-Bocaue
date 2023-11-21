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
               return {
                  ...doc.data(),
                  id: doc.id,
                  created_at: doc.data().created_at.toDate(),
               };
            }) as MessageType[];

            HandleGapMinutes(data);
         },
         (err) => {
            console.log(err);
            setMessages(null);
         }
      );
   };

   const HandleGapMinutes = (messages: MessageType[]) => {
      let data: MessageType[] = [];

      for (let i = 0; i < messages.length; i++) {
         if (i === 0) {
            data = data.concat({ ...messages[0] });
         } else {
            const prevDatetime = messages[i - 1].created_at;
            const currentDatetime = messages[i].created_at;
            const gapInMilliseconds = currentDatetime - prevDatetime;
            const gapInMinutes = gapInMilliseconds / (1000 * 60);

            if (gapInMinutes > 30) {
               data = data.concat({
                  ...messages[i],
                  gap: true,
               });
            } else {
               data = data.concat({
                  ...messages[i],
                  gap: false,
               });
            }
         }
         setMessages(data);
      }
   };
   const [isHide, setIsHide] = useState(false);

   return (
      <div className="flex flex-row h-screen">
         <Inbox
            isHide={isHide}
            setIsHide={setIsHide}
            activeInbox={activeInbox}
            setActiveInbox={setActiveInbox}
         />
         {activeInbox && (
            <Messages
               isHide={isHide}
               activeInbox={activeInbox}
               messages={messages}
               setMessages={setMessages}
            />
         )}
      </div>
   );
};

export default Message;
