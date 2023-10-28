import { AiFillHome, AiFillSchedule } from "react-icons/ai";
import { BsFillMegaphoneFill } from "react-icons/bs";
import { GiBattleGear } from "react-icons/gi";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import style from "./style.module.scss";
import { MdEmail, MdHealthAndSafety } from "react-icons/md";

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
   ];

   const link = window.location.pathname;

   return (
      <ul className={style.module}>
         {Menu.map((item, i) => {
            return (
               <li
                  key={item.name + i}
                  className={link.includes(item.link) ? style.active_lnk : ""}
               >
                  <Link
                     to={item.link}
                     className={isMenu ? style.actve_mnu : style.in_actv_mnu}
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
