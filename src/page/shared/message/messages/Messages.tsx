import { useRef, useEffect, useContext, useState } from "react";
import style from "./Style.module.scss";
import { MdDelete } from "react-icons/md";
import { UserProvider } from "../../../../context/UserProvider";
import Reply from "./Reply";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/Base";
import { SimpleSnackbar } from "../../../../components/mui/alert/alert";
import moment from "moment";

type MessagesType = {
   activeInbox: Inbox;
   messages: MessageType[] | null | undefined;
   setMessages: React.Dispatch<
      React.SetStateAction<MessageType[] | null | undefined>
   >;
};
const Messages = ({ activeInbox, messages }: MessagesType) => {
   const ref = useRef<HTMLDivElement | null>(null);
   const { cookies } = useContext(UserProvider);

   useEffect(() => {
      if (!ref.current) return;
      ref.current.scrollIntoView({
         behavior: "instant",
         block: "start",
      });
   }, [messages]);

   const [messageInformation, setMessageInformation] = useState({
      open: false,
      deleteMessage: "",
   });

   const DeleteMessage = async (id: string) => {
      if (navigator.onLine) {
         console.log(navigator.onLine);
      }
      if (!messages) return;

      const message = messages.find((item) => item.id === id);

      if (!message) return;

      setMessageInformation((prev) => ({
         ...prev,
         open: false,
      }));

      const docData = {
         status: "del",
      };

      await updateDoc(
         doc(db, "inbox", activeInbox.id, "messages", message.id),
         docData
      )
         .then(() => {})
         .catch((err) => {
            console.log("sending message error", err);
         });
   };

   return (
      <>
         <div className="flex flex-col items-start w-[60%] h-screen border-r">
            <div className="flex flex-col justify-between w-full h-screen">
               <div className="message-container flex flex-col gap-3 h-screen pt-2 overflow-y-auto px-2">
                  {messages === undefined ? (
                     <h1 className="text-center text-gray-400">Loading...</h1>
                  ) : !cookies || messages === null ? (
                     <h1 className="text-center text-gray-400">
                        OOPS! Something went wrong
                     </h1>
                  ) : (
                     messages.map((item) => {
                        if (item.status === "del") {
                           return (
                              <div
                                 key={item.id}
                                 className={
                                    item.from === cookies?.id
                                       ? style.unsent_message
                                       : style.unsent_message_
                                 }
                              >
                                 <span>Unsent Message</span>
                              </div>
                           );
                        } else {
                           return (
                              <Message
                                 key={item.id}
                                 id={cookies.id}
                                 message={item}
                                 onClick={() => {
                                    setMessageInformation((prev) => ({
                                       ...prev,
                                       open: true,
                                       deleteMessage: item.id,
                                    }));
                                 }}
                              />
                           );
                        }
                     })
                  )}

                  <div ref={ref} />
               </div>
               <Reply id={activeInbox.id} />
            </div>
         </div>
         <SimpleSnackbar
            open={messageInformation.open}
            message="Are you sure you want to delete this message?"
            onClose={() => {
               setMessageInformation((prev) => ({
                  ...prev,
                  open: false,
               }));
            }}
            onClick={() => DeleteMessage(messageInformation.deleteMessage)}
         />
      </>
   );
};

export default Messages;

type MessageType1 = {
   message: MessageType;
   onClick: () => void;
   id: string;
};
const Message = ({ message, onClick, id }: MessageType1) => {
   const isMyMessage = message.from === id;

   return (
      <div
         className={`${isMyMessage ? style.my_message : style.message} ${
            message.gap ? "mt-4" : "mt-0"
         }`}
      >
         {message.gap && (
            <span className={style.message_gap}>
               <hr />
               {moment(message.created_at.toISOString())
                  .utcOffset(0)
                  .format("LLL")}
               <hr />
            </span>
         )}
         {isMyMessage && (
            <MdDelete
               className={style.delete_message}
               title="delete"
               onClick={onClick}
            />
         )}

         <p>{message.message}</p>
         {message.status === "sending" && (
            <span className={style.status_message}>sending</span>
         )}
      </div>
   );
};
