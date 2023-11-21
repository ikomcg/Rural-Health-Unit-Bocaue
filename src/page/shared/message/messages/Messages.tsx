import { useRef, useEffect, useContext, useState } from "react";
import style from "./Style.module.scss";
import { MdDelete } from "react-icons/md";
import { UserProvider } from "../../../../context/UserProvider";
import Reply from "./Reply";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/Base";
import { SimpleSnackbar } from "../../../../components/mui/alert/alert";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type MessagesType = {
   activeInbox: Inbox;
   isHide: boolean;
   messages: MessageType[] | null | undefined;
   setMessages: React.Dispatch<
      React.SetStateAction<MessageType[] | null | undefined>
   >;
};
const Messages = ({ activeInbox, messages, isHide }: MessagesType) => {
   const ref = useRef<HTMLDivElement | null>(null);
   const { cookies } = useContext(UserProvider);
   const isNotActive =
      activeInbox.to_user.account_status !== "active" ||
      activeInbox.from_user.account_status !== "active";

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
      );
   };

   return (
      <>
         <div
            className="flex flex-col items-start h-screen border-r"
            style={{
               width: isHide ? "100%" : "60%",
               transition: "all ease-in-out .2s",
            }}
         >
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
                                    if (isNotActive) return;
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
               {isNotActive ? (
                  <div className="bg-gray-100 p-2 text-center">
                     <small className="text-center text-gray-400">
                        Account is not Available
                     </small>
                  </div>
               ) : (
                  <Reply activeInbox={activeInbox} />
               )}
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

const FileMessages = ({ message }: Pick<MessageType1, "message">) => {
   const imageVideoFilter = message.files.filter(
      (item) => item.type.includes("image") || item.type.includes("video")
   );
   const filesFilter = message.files.filter(
      (item) => !item.type.includes("image") && !item.type.includes("video")
   );

   return (
      <>
         {message.files.length !== 0 ? (
            <>
               {imageVideoFilter.length !== 0 && (
                  <div className={style.message_files}>
                     {imageVideoFilter.map((item) => {
                        if (item.type.includes("image")) {
                           return (
                              <LazyLoadImage
                                 key={item.type + item.url}
                                 src={item.url}
                                 alt={item.url}
                                 effect="blur"
                              />
                           );
                        } else if (item.type.includes("video")) {
                           return (
                              <video controls>
                                 <source src={item.url} type="video/mp4" />
                              </video>
                           );
                        }
                     })}
                  </div>
               )}
               {filesFilter.length !== 0 && (
                  <div
                     className={style.docs_file}
                     style={{
                        display: "flex",
                        flexFlow: "column",
                        gap: "3px",
                     }}
                  >
                     {filesFilter.map((item) => (
                        <a href={item.url} target="_blank">
                           {item.name}
                        </a>
                     ))}
                  </div>
               )}
            </>
         ) : (
            <></>
         )}
      </>
   );
};

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
         <div
            className={`flex flex-col max-w-[70%] ${
               isMyMessage ? "items-end" : "items-start"
            }`}
         >
            <FileMessages message={message} />
            {message.message.trim() !== "" && (
               <p className="mt-1">{message.message}</p>
            )}
         </div>

         {message.status === "sending" && (
            <span className={style.status_message}>sending</span>
         )}
      </div>
   );
};
