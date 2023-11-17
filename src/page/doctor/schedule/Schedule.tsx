import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Container from "../../../components/container/Container";
import interactionPlugin from "@fullcalendar/interaction";
import { useFetchMySchedules } from "../../../hooks/Schedule";
import { useContext, useMemo } from "react";
import { UserProvider } from "../../../context/UserProvider";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import timeGridPlugin from "@fullcalendar/timegrid";

const Schedule = () => {
   const { cookies } = useContext(UserProvider);

   const schedules = useFetchMySchedules({
      id: cookies?.id,
      _limit: 100,
   });

   const MySchedules = useMemo(() => {
      if (!schedules) return [];

      const mySchedules = schedules.map((item) => ({
         title: item.service_name,
         start: item.request_date,
      }));

      return mySchedules;
   }, [schedules]);

   return (
      <Container className="relative">
         <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
               left: "prev,next today",
               center: "title",
               right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={MySchedules}
            eventColor="#2b90f9"
            eventTimeFormat={{
               hour: "numeric",
               minute: "2-digit",
               meridiem: "short",
            }}
            eventDidMount={(info) => {
               return new bootstrap.Popover(info.el, {
                  title: info.event.title,
                  placement: "top",
                  trigger: "hover",
                  customClass: "popoverStyle",
                  content: `<p><strong>Schedule:</strong> ${moment(
                     info.event.start
                  )
                     .utcOffset(8)
                     .format("LLL")}</p>`,
                  html: true,
               });
            }}
         />
      </Container>
   );
};

export default Schedule;
