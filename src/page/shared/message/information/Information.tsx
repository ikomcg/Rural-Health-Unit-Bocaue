import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { UserProvider } from "../../../../context/UserProvider";
import { UpdateMessage } from "../../../../firebase/Message";

type InformationType = {
   activeInbox: Inbox;
};

const Information = ({ activeInbox }: InformationType) => {
   const { cookies } = useContext(UserProvider);
   const isReciever = cookies?.id === activeInbox.to_id;
   const profile = isReciever
      ? activeInbox.from_user.profile
      : activeInbox.to_user.profile;
   return (
      <div className="w-[20%] ml-1">
         <div className="w-full flex flex-col items-center mt-10">
            <img
               src={profile === "" ? "/image/profile.png" : profile}
               alt=""
               style={{
                  maxWidth: "80px",
                  width: "100%",
                  height: "80px",
                  clipPath: "circle()",
               }}
            />
            <h2 className="text-md font-semibold">
               {isReciever
                  ? activeInbox.from_user.full_name
                  : activeInbox.to_user.full_name}
            </h2>
            <span className="text-xs">STI Student</span>
         </div>
         <div className="mt-10">
            <button
               className="flex items-center text-sm hover:bg-gray-100 w-full py-3 px-1"
               onClick={async () => {
                  await UpdateMessage({
                     id: activeInbox.id,
                     data: {
                        delete_to: [...activeInbox.delete_to, cookies?.id],
                     },
                  });
               }}
            >
               <MdDelete color="#14599d" />
               Delete Message
            </button>
         </div>
      </div>
   );
};

export default Information;
