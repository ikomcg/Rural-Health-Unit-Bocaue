import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Calendar from "../Calendar";
import style from "./style.module.scss";
import "../calendar.scss";
const AdminLayout = () => {
   return (
      <div className={style.container}>
         <SideBar />
         <div className="w-[65%]">
            <Outlet />
         </div>
         <div className="rgth_cldr w-[20%]">
            <Calendar />
         </div>
      </div>
   );
};

export default AdminLayout;
