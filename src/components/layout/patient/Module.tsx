import { AiFillHome, AiFillSchedule } from "react-icons/ai";
import { GiBattleGear } from "react-icons/gi";
import { Link } from "react-router-dom";
import style from "./style.module.scss";
import { MdEmail, MdOutlineQueuePlayNext } from "react-icons/md";
import { useState } from "react";

type ModuleType = {
   isMenu: boolean;
   setIsMenu: React.Dispatch<React.SetStateAction<boolean>>;
};
const Module = ({ isMenu, setIsMenu }: ModuleType) => {
   const Menu = [
      {
         name: "Home",
         icon: <AiFillHome />,
         link: "home",
      },
      {
         name: "Service And Medicine",
         icon: <GiBattleGear />,
         link: "service-medicine/health-services",
      },
      {
         name: "Schedule",
         icon: <AiFillSchedule />,
         link: "schedule",
      },
      {
         name: "Messages",
         icon: <MdEmail />,
         link: "messages",
      },
      {
         name: "Queueing",
         icon: <MdOutlineQueuePlayNext />,
         link: "queueing",
      },
   ];

   const link = window.location.pathname;
   const [activeTab, setActiveTab] = useState(link);

   const HandleActiveLink = (link: string) => {
      setActiveTab(link);
      setIsMenu((prev) => !prev);
   };
   return (
      <ul className={style.module}>
         {Menu.map((item, i) => {
            return (
               <li
                  key={item.name + i}
                  className={
                     activeTab.includes(item.link) ? style.active_lnk : ""
                  }
               >
                  <Link
                     to={item.link}
                     className={isMenu ? style.actve_mnu : style.in_actv_mnu}
                     onClick={() => HandleActiveLink(item.link)}
                  >
                     {item.icon}
                     <span>{item.name}</span>
                  </Link>
               </li>
            );
         })}
      </ul>
   );
};

export default Module;
