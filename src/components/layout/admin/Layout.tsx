import SideBar from "./SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import Calendar from "../Calendar";
import style from "./style.module.scss";
import "../calendar.scss";
import { useContext } from "react";
import { UserProvider } from "../../../context/UserProvider";
const AdminLayout = () => {
   const{cookies} = useContext(UserProvider)
   const navigate = useNavigate()
   return (
      !cookies?.role.includes("admin") ?
      navigate('/')
      :
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
