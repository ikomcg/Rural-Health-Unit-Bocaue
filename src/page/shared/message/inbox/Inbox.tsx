import { AiOutlineSearch } from "react-icons/ai";
import style from "./Style.module.scss";
import InboxFetch from "../../../../firebase/message/Inbox";
import { BiSolidEdit } from "react-icons/bi";
import { useContext, useMemo, useState } from "react";
import SendMessage from "./SendMessage";
import { UserProvider } from "../../../../context/UserProvider";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import CSwal from "../../../../components/swal/Swal";

type InboxType = {
   activeInbox: Inbox | null | undefined;
   isHide: boolean;
   setIsHide: React.Dispatch<React.SetStateAction<boolean>>;
   setActiveInbox: React.Dispatch<
      React.SetStateAction<Inbox | null | undefined>
   >;
};
const Inbox = ({
   activeInbox,
   setActiveInbox,
   isHide,
   setIsHide,
}: InboxType) => {
   const { cookies } = useContext(UserProvider);
   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
   const [open, setOpen] = useState(false);
   const inbox = InboxFetch(setActiveInbox);
   const [search, setSearch] = useState("");
   const HandleAddMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!cookies?.is_verify) {
         CSwal({
            icon: "info",
            title: "Account not Verified",
            text: "Contact Rural Health Unit to verify your account",
         });
         return;
      }
      setAnchorEl(event.currentTarget);
      setOpen((prev) => !prev);
   };

   const InboxFilter = useMemo(() => {
      if (!inbox) return [];

      inbox;

      const filterInBox = inbox.filter((item) => {
         const isReciever = cookies && item.to_id === cookies.id;

         if (isReciever) {
            return item.from_user.full_name
               .toLocaleLowerCase()
               .trim()
               .includes(search.toLocaleLowerCase().trim());
         }

         return item.to_user.full_name
            .toLocaleLowerCase()
            .trim()
            .includes(search.toLocaleLowerCase().trim());
      });

      return filterInBox;
   }, [inbox, search]);

   const styleMenu = {
      active: {
         width: 0,
         padding: 0,
         transition: "all ease-in-out .2s",
         // overflow: "hidden",
      },
      inactive: {
         width: "40%",
         padding: "10px",
         transition: "all ease-in-out .2s",
      },
   };

   const SetMenuHide = () => {
      setIsHide((prev) => !prev);
   };

   return (
      <>
         <div
            className="relative w-[40%] h-full border-r p-2 ease-in-out"
            style={isHide ? styleMenu.active : styleMenu.inactive}
         >
            <div
               className="flex-col pr-3 h-full"
               style={{
                  display: isHide ? "none" : "flex",
               }}
            >
               <div className="flex items-center justify-between mb-5">
                  <h1 className="text-lg font-semibold text-blue">Inbox</h1>
                  <button
                     onClick={HandleAddMessage}
                     disabled={cookies?.account_status !== "active"}
                  >
                     <BiSolidEdit
                        className={`${
                           cookies?.account_status !== "active"
                              ? "text-gray-500"
                              : "text-blue"
                        } text-2xl`}
                     />
                  </button>
               </div>
               <div className="flex flex-row bg-gray-200 mb-4 rounded-lg px-2">
                  <input
                     type="text"
                     placeholder="search..."
                     className="w-full py-2 outline-none bg-transparent"
                     onChange={(e) => setSearch(e.target.value.trim())}
                  />
                  <button className="text-xl text-blue">
                     <AiOutlineSearch />
                  </button>
               </div>
               <div className="flex flex-col h-full gap-3 overflow-y-auto">
                  {inbox === undefined ? (
                     <h1 className="text-center text-gray-400">Loading...</h1>
                  ) : inbox === null ? (
                     <h1 className="text-center text-gray-400">
                        Something went wrong
                     </h1>
                  ) : (
                     InboxFilter.map((item) => {
                        const isReciever = cookies && item.to_id === cookies.id;
                        const profile = isReciever
                           ? item.from_user.profile
                           : item.to_user.profile;

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
                                    {isReciever
                                       ? item.from_user.full_name
                                       : item.to_user.full_name}
                                 </h2>
                                 <p className="word-wrap line-clamp-1 text-sm">
                                    {item.message}
                                 </p>
                              </div>
                           </div>
                        );
                     })
                  )}
               </div>
            </div>
            <button className={style.btn_inbox} onClick={SetMenuHide}>
               {!isHide ? <FaChevronCircleLeft /> : <FaChevronCircleRight />}
            </button>
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
