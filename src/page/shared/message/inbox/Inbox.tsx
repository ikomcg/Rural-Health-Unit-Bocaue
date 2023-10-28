import { AiOutlineSearch } from "react-icons/ai";
import style from "./Style.module.scss";
import InboxFetch from "../../../../firebase/message/Inbox";
import { BiSolidEdit } from "react-icons/bi";
import { useContext, useState } from "react";
import SendMessage from "./SendMessage";
import { UserProvider } from "../../../../context/UserProvider";

type InboxType = {
   activeInbox: Inbox | null | undefined;
   setActiveInbox: React.Dispatch<
      React.SetStateAction<Inbox | null | undefined>
   >;
};
const Inbox = ({ activeInbox, setActiveInbox }: InboxType) => {
   const { cookies } = useContext(UserProvider);
   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
   const [open, setOpen] = useState(false);
   const inbox = InboxFetch(setActiveInbox);

   const HandleAddMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => !prev);
   };
   return (
      <>
         <div className="w-[40%] h-full border-r mr-1 p-2">
            <div className="flex flex-col pr-3 h-full">
               <div className="flex items-center justify-between mb-5">
                  <h1 className="text-lg font-semibold text-blue">Inbox</h1>
                  <button onClick={HandleAddMessage}>
                     <BiSolidEdit className="text-blue text-2xl" />
                  </button>
               </div>
               <div className="relative mb-4">
                  <AiOutlineSearch className="absolute top-2 right-3 text-xl text-blue" />
                  <input
                     type="text"
                     placeholder="search..."
                     className="bg-gray-200 w-full py-2 px-2 rounded-lg"
                  />
               </div>
               <div className="flex flex-col h-full gap-3 overflow-y-auto">
                  {inbox === undefined ? (
                     <h1 className="text-center text-gray-400">Loading...</h1>
                  ) : inbox === null ? (
                     <h1 className="text-center text-gray-400">
                        Something went wrong
                     </h1>
                  ) : (
                     inbox.map((item) => {
                        const isReciever = cookies && item.to_id === cookies.id;
                        const profile = isReciever
                           ? item.from_profile
                           : item.to_profile;

                        return (
                           <div
                              key={item.id}
                              className={`${style.inbox_card} ${
                                 activeInbox?.id === item.id
                                    ? "bg-gray-200"
                                    : "bg-white"
                              }`}
                              onClick={() => {
                                 setActiveInbox({ ...item });
                              }}
                           >
                              <img
                                 src={
                                    profile === ""
                                       ? "/image/profile.png"
                                       : profile
                                 }
                              />
                              <div className="flex flex-col pl-2">
                                 <h2 className="text-sm font-semibold">
                                    {isReciever ? item.from_name : item.to_name}
                                 </h2>
                                 <p className="word-wrap line-clamp-1 text-sm">
                                    {item.latest_message}
                                 </p>
                              </div>
                           </div>
                        );
                     })
                  )}
               </div>
            </div>
         </div>
         {inbox && (
            <SendMessage
               anchorEl={anchorEl}
               open={open}
               setOpen={setOpen}
               inbox={inbox}
            />
         )}
      </>
   );
};

export default Inbox;
