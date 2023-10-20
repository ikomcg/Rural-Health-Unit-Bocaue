import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Container from "../../../components/container/Container";
import interactionPlugin from "@fullcalendar/interaction";
import { useFetchMySchedules } from "../../../hooks/Schedule";
import { useContext, useMemo } from "react";
import { UserProvider } from "../../../context/UserProvider";

const Schedule = () => {
   const { cookies } = useContext(UserProvider);

   const schedules = useFetchMySchedules({
      id: cookies?.id,
      _limit: 4,
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
      <Container>
         <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
               start: "title",
               center: "",
               end: "today prev,next",
            }}
            events={MySchedules}
            eventColor="#2b90f9"
            eventTimeFormat={{
               hour: "numeric",
               minute: "2-digit",
               meridiem: "short",
            }}
         />
      </Container>
   );
};

export default Schedule;
