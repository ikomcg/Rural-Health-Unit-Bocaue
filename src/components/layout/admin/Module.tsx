import { AiFillHome, AiFillSchedule } from "react-icons/ai";
import { BsFillMegaphoneFill } from "react-icons/bs";
import { GiBattleGear } from "react-icons/gi";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import style from "./style.module.scss";
import {
   MdEmail,
   MdHealthAndSafety,
   MdInventory,
   MdOutlineQueuePlayNext,
} from "react-icons/md";
import { useState } from "react";
// import { TbReportSearch } from "react-icons/tb";

type ModuleType = {
   isMenu: boolean;
};
const Module = ({ isMenu }: ModuleType) => {
   const Menu = [
      {
         name: "Home",
         icon: <AiFillHome />,
         link: "home",
      },
      {
         name: "Announcement",
         icon: <BsFillMegaphoneFill />,
         link: "announcement",
      },
      {
         name: "Service And Medicine",
         icon: <GiBattleGear />,
         link: "service-medicine/health-services",
      },
      {
         name: "Messages",
         icon: <MdEmail />,
         link: "messages",
      },
      {
         name: "Inventory",
         icon: <MdInventory />,
         link: "inventory",
      },
      // { name: "Reports", icon: <TbReportSearch />, link: "reports" },
      {
         name: "Health Workers",
         icon: <MdHealthAndSafety />,
         link: "health-worker",
      },
      {
         name: "Patient",
         icon: <FaUsers />,
         link: "patient",
      },
      {
         name: "Schedule",
         icon: <AiFillSchedule />,
         link: "schedule",
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
