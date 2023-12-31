import SideBar from "./SideBar";
import { Navigate, Outlet } from "react-router-dom";
import Calendar from "../Calendar";
import style from "./style.module.scss";
import "../calendar.scss";
import { useContext, useEffect } from "react";
import { UserProvider } from "../../../context/UserProvider";
import { useState } from "react";
import Schedule from "./Schedule";
import Online from "../Online";
import { useFetchQueueList } from "../../../hooks/Department";
const PatientLayout = () => {
   const { cookies } = useContext(UserProvider);
   const [isMenu, setIsMenu] = useState(true);
   const queueLists = useFetchQueueList({});
   const currentQueue = queueLists?.filter((item) => item.status === "current");

   useEffect(() => {
      Notification.requestPermission().then((perm) => {
         if (perm === "granted" && currentQueue) {
            const len = currentQueue.length;
            if (len === 0) return;
            const queue = currentQueue[len - 1];
            new Notification("RURAL HEALTH UNIT | BOCAUE BULACAN", {
               body: `Calling ${queue.token_number}, Please Proceed to ${queue.department.name} Department`,
            });
         }
      });
   }, [currentQueue]);

   return !cookies ? (
      Navigate({ to: "/" })
   ) : (
      <div className={style.container}>
         <SideBar isMenu={isMenu} setIsMenu={setIsMenu} />
         <div
            className={`overflow-y-auto mt-20 lg:mt-0 ${style.oulet_container}`}
            style={{
               width: isMenu ? "60%" : "80%",
            }}
         >
            <Outlet />
         </div>
         <div className={`rgth_cldr w-[25%] ${style.right_bar}`}>
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

export default PatientLayout;
