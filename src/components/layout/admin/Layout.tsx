import SideBar from "./SideBar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Calendar from "../Calendar";
import style from "./style.module.scss";
import "../calendar.scss";
import { useContext, useEffect } from "react";
import { UserProvider } from "../../../context/UserProvider";
import { useState } from "react";

const AdminLayout = () => {
   const { cookies } = useContext(UserProvider);
   const navigate = useNavigate();
   const url = window.location.pathname;
   const [isMenu, setIsMenu] = useState(true);

   useEffect(() => {
      if (url === "/patient" && cookies) {
         navigate("/patient/home");
      }
   }, [url]);

   return !cookies ? (
      Navigate({ to: "/" })
   ) : (
      <div className={style.container}>
         <SideBar isMenu={isMenu} setIsMenu={setIsMenu} />
         <div
            className={`overflow-y-auto`}
            style={{
               width: isMenu ? "65%" : "85%",
            }}
         >
            <Outlet />
         </div>
         <div className="rgth_cldr w-[20%]">
            <Calendar />
         </div>
      </div>
   );
};

export default AdminLayout;
