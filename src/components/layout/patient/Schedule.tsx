import style from "./style.module.scss";

const Schedule = () => {
   return (
      <div className={style.schedules}>
         <h2>Schedules</h2>

         <ul>
            <li className="word-wrap line-clamp-1">
               Juan Dela Cruz (sept 2 2022 - 10 : 00 am)
            </li>
            <li className="word-wrap line-clamp-1">
               Juan Dela Cruz (sept 2 2022 - 10 : 00 am)
            </li>
            <li className="word-wrap line-clamp-1">
               Juan Dela Cruz (sept 2 2022 - 10 : 00 am)
            </li>
            <li className="word-wrap line-clamp-1">
               Juan Dela Cruz (sept 2 2022 - 10 : 00 am)
            </li>
         </ul>

         <button>see all</button>
      </div>
   );
};

export default Schedule;
