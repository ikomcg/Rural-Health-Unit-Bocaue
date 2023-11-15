import style from "./style.module.scss";
import moment from "moment";

import { useFetchAllSchedules } from "../../../hooks/Schedule";

const Schedule = () => {
   const schedules = useFetchAllSchedules({
      _limit: 4,
   });

   return (
      <div className={style.schedules}>
         <h2>Upcoming Schedules</h2>

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
                     title={`${item.patient.full_name} - ${moment(
                        item.request_date.toISOString()
                     )
                        .utcOffset(8)
                        .format("LLLL")}} - ${item.service_name}`}
                  >
                     {item.patient.full_name} -{" "}
                     {moment(item.request_date.toISOString())
                        .utcOffset(8)
                        .format("LLLL")}{" "}
                  </li>
               ))
            )}
         </ul>
      </div>
   );
};

export default Schedule;
