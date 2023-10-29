import { useFetchOnlineUsers } from "../../hooks/Users";
import style from "./style.module.scss";

type OnlineType = {
   role: string[];
};
const Online = ({ role }: OnlineType) => {
   const users = useFetchOnlineUsers({ role });
   return (
      <div className={style.online_container}>
         <span className="text-lg text-blue font-[400]">Online</span>
         <div className="mt-3">
            {users === undefined ? (
               <span className="text-slate-400">Loading...</span>
            ) : users === null ? (
               <span className="text-slate-400">Something went wrong</span>
            ) : users.length === 0 ? (
               <span className="text-slate-400">No Users Online</span>
            ) : (
               users.map((item) => (
                  <div key={item.id} title={item.full_name}>
                     <div>
                        <img src={item.profile} alt={item.profile} />
                        <span>{item.full_name}</span>
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>
   );
};

export default Online;
