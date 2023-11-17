import style from "./style.module.scss";
import { useContext } from "react";
import { UserProvider } from "../../../context/UserProvider";
import moment from "moment";
import { useFetchDoctorSchedules } from "../../../hooks/Schedule";

const Schedule = () => {
   const { cookies } = useContext(UserProvider);

   const schedules = useFetchDoctorSchedules({
      id: cookies?.id,
      _limit: 4,
   });

   return (
      <div className={style.schedules}>
         <h2>My Schedules</h2>

         <ul>
            {schedules === undefined ? (
               <li className="text-center text-slate-400">Loading....</li>
            ) : schedules === null ? (
               <li className="text-center text-slate-400">
                  Error Get list Schedules
               </li>
            ) : schedules.length === 0 ? (
               <li className="text-center text-slate-400">No Schedules</li>
            ) : (
               schedules.map((item) => (
                  <li
                     key={item.id}
                     className="word-wrap line-clamp-1"
                     title={`${item.service_name} - ${moment(
                        item.request_date.toISOString()
                     )
                        .utcOffset(8)
                        .format("LLLL")}}`}
                  >
                     {moment(item.request_date.toISOString())
                        .utcOffset(8)
                        .format("LLL")}{" "}
                     - {item.service_name}
                  </li>
               ))
            )}
         </ul>
      </div>
   );
};

export default Schedule;
