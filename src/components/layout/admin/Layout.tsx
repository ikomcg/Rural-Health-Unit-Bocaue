import SideBar from "./SideBar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Calendar from "../Calendar";
import style from "./style.module.scss";
import "../calendar.scss";
import { useContext, useEffect } from "react";
import { UserProvider } from "../../../context/UserProvider";
const AdminLayout = () => {
   const { cookies } = useContext(UserProvider);
   const navigate = useNavigate();
   const url = window.location.pathname;

   useEffect(() => {
      if (url === "/patient" && cookies) {
         navigate("/patient/home");
      }
   }, [url]);

   return !cookies ? (
      Navigate({ to: "/" })
   ) : (
      <div className={style.container}>
         <SideBar />
         <div className="w-[65%] overflow-y-auto">
            <Outlet />
         </div>
         <div className="rgth_cldr w-[20%]">
            <Calendar />
         </div>
      </div>
   );
};

export default AdminLayout;
