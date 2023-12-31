import SideBar from "./SideBar";
import { Navigate, Outlet } from "react-router-dom";
import Calendar from "../Calendar";
import style from "./style.module.scss";
import "../calendar.scss";
import { useContext } from "react";
import { UserProvider } from "../../../context/UserProvider";
import { useState } from "react";
import Schedule from "./Schedule";
import Online from "../Online";

const AdminLayout = () => {
   const { cookies } = useContext(UserProvider);
   const [isMenu, setIsMenu] = useState(true);

   return !cookies ? (
      Navigate({ to: "/" })
   ) : (
      <div className={style.container}>
         <SideBar isMenu={isMenu} setIsMenu={setIsMenu} />
         <div
            className={`overflow-y-auto overflow-x-hidden`}
            style={{
               width: isMenu ? "60%" : "80%",
            }}
         >
            <Outlet />
         </div>
         <div className="rgth_cldr w-[25%]">
            <Calendar />
            <Schedule />
            <Online
               role={[
                  "rural health physician",
                  "health-worker",
                  "patient",
                  "public health nurse",
               ]}
            />
         </div>
      </div>
   );
};

export default AdminLayout;
