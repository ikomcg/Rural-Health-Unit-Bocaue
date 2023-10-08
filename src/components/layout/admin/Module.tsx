import { AiFillHome, AiFillSchedule } from "react-icons/ai";
import { BsFillMegaphoneFill } from "react-icons/bs";
import { GiBattleGear } from "react-icons/gi";
import { Link } from "react-router-dom";
import { MdOutlineInventory } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import style from "./style.module.scss"
const Module = () => {
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
         link: "service-medicine",
      },
      {
         name: "Inventory",
         icon: <MdOutlineInventory />,
         link: "inventory",
      },
      {
         name: "Report",
         icon: <TbReportSearch />,
         link: "report",
      },
      {
         name: "Schedule",
         icon: <AiFillSchedule />,
         link: "schedule",
      },
      {
         name: "Patient",
         icon: <FaUsers />,
         link: "patient",
      },
   ];
   return (
      <ul className={style.module}>
         {Menu.map((item, i) => {
            return (
               <li key={item.name+i} >
                  <a href={item.link}>
                    {item.icon}
                    <Link to={item.link}>{item.name}</Link>
                  </a>
               </li>
            );
         })}
      </ul>
   );
};

export default Module;
