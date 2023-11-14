import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { IoMdClose } from "react-icons/io";
import To from "./To";
import { FormEvent, useContext, useEffect, useState } from "react";
import style from "./Style.module.scss";
import { BlueButton } from "../../../../components/button/BlueButton";
import { UserProvider } from "../../../../context/UserProvider";
import {
   CreateConversation,
   UpdateConversation,
} from "../../../../firebase/message/message";
import { CreateRapidApi } from "../../../../api/SMS/SendSMS";

type SendMessageType = {
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   anchorEl: HTMLButtonElement | null;
   inbox: Inbox[];
   open: boolean;
};
const SendMessage = ({ anchorEl, open, setOpen, inbox }: SendMessageType) => {
   const { cookies } = useContext(UserProvider);
   const [isFocus, setIsFocus] = useState(false);
   const [users, setUsers] = useState<UserType[] | null>();
   const [toMessage, setToMessage] = useState({
      name: "",
      id: "",
      message: "",
      profile: "",
      to_phone: "",
   });

   const OnClose = () => {
      setOpen(false);
      setToMessage({
         name: "",
         id: "",
         message: "",
         profile: "",
         to_phone: "",
      });
   };
   const SendMessage = async (event: FormEvent) => {
      event.preventDefault();

      if (!cookies) return;

      const { id, first_name, last_name, middle_name, profile } = cookies;

      const has_convo = inbox.find(
         (item) =>
            (item.to_id === toMessage.id && item.from_id === cookies?.id) ||
            (item.from_id === toMessage.id && item.to_id === cookies?.id)
      );

      OnClose();

      if (has_convo) {
         await UpdateConversation({
            message: toMessage.message,
            convoID: has_convo.id,
            from_id: id,
         });
      } else {
         await CreateConversation({
            toMessage: toMessage,
            from_id: cookies.id,
            from_name: `${first_name} ${middle_name} ${last_name}`,
            from_profile: profile,
            from_phone: cookies.contact_no,
         });
      }

      await CreateRapidApi({
         endPoint: "sms/send",
         token: "bWFyZmllZWNhbWFyQGdtYWlsLmNvbTpCOTVGRTA3Qi0wMUY5LTlDMzgtQTYxNS01RUJFNDQ4MUIwMkY=",
         data: {
            messages: [
               {
                  from: "RHU",
                  body: `${cookies.full_name} sent a message`,
                  to: toMessage.to_phone,
               },
            ],
         },
      });
   };

   useEffect(() => {
      const handleClick = () => {
         setIsFocus(false);
      };

      document.addEventListener("click", handleClick);

      return () => {
         document.removeEventListener("click", handleClick);
      };
   }, []);

   return (
      <Popper
         open={open}
         anchorEl={anchorEl}
         placement="right-start"
         transition
         style={{
            maxWidth: "400px",
            width: "100%",
         }}
      >
         {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
               <Paper
                  style={{
                     width: "100%",
                     padding: "10px 0",
                  }}
               >
                  <div className="flex flex-row items-center justify-between px-2 mb-4">
                     <h1 className="text-blue">New Message</h1>
                     <IoMdClose
                        className="text-blue text-xl"
                        onClick={OnClose}
                     />
                  </div>
                  <div className="relative flex flex-row items-center gap-3 px-2 mb-4">
                     <label htmlFor="to" className="text-blue">
                        To:
                     </label>
                     <input
                        className={style.search}
                        placeholder="Aa"
                        type="text"
                        id="to"
                        autoComplete="off"
                        value={toMessage.name}
                        onClick={(e) => {
                           e.stopPropagation();
                           setIsFocus(true);
                        }}
                        onChange={(e) =>
                           setToMessage((prev) => ({
                              ...prev,
                              name: e.target.value,
                           }))
                        }
                     />
                     {isFocus && (
                        <To
                           toMessage={toMessage.name}
                           setToMessage={setToMessage}
                           users={users}
                           setUsers={setUsers}
                        />
                     )}
                  </div>
                  <hr />
                  <form
                     onSubmit={SendMessage}
                     className="flex flex-col items-end gap-3 mt-3 px-2 w-full"
                  >
                     <textarea
                        className="w-full h-[200px] outline-none border p-2"
                        id="message"
                        placeholder="Aa"
                        value={toMessage.message}
                        onChange={(e) => {
                           setToMessage((prev) => ({
                              ...prev,
                              message: e.target.value,
                           }));
                        }}
                     />
                     <BlueButton type="submit">Send</BlueButton>
                  </form>
               </Paper>
            </Fade>
         )}
      </Popper>
   );
};

export default SendMessage;
