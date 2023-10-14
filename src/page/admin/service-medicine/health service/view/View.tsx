import { useParams } from "react-router-dom";
import Doctors from "./Doctors";
import { useState } from "react";
import { CreateServiceScheduleFrb } from "../../../../../firebase/Service/Create";
import Swal from "sweetalert2";
import useFetchDoctors from "../../../../../hooks/Doctors";
import { BlueButton } from "../../../../../components/button/BlueButton";
import { TimeStampValue } from "../../../../../shared/TimeStamp";

const ViewService = () => {
   const { name, id } = useParams();
   const doctors = useFetchDoctors();
   const [payload, setPayload] = useState({
      id: "",
      name: "",
      available_from: "",
      available_to: "",
   });

   const CreateSchedule = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!id) return;

      const data = await CreateServiceScheduleFrb({
         data: {
            ...payload,
            id: "",
            available_from: TimeStampValue(payload.available_from),
            available_to: TimeStampValue(payload.available_to),
         },
         id,
      });

      if (!data) {
         return Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: "Failed to Add Schedule",
         });
      }
      setPayload({
         id: "",
         name: "",
         available_from: "",
         available_to: "",
      });
   };
   const OnChangeHandel = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
      const { name, value } = e.target;

      setPayload((prev) => ({ ...prev, [name]: value }));

      if (name === "id" && doctors) {
         const doctorName = doctors.find((item) => item.id === value);
         if (!doctorName) return;
         setPayload((prev) => ({ ...prev, name: doctorName.name }));
      }
   };

   return (
      <div className="flex flex-col">
         <h1 className="text-blue text-2xl mt-10">{name}</h1>

         <form
            className="flex flex-row gap-3 flex-nowrap mt-5"
            id="schedule"
            onSubmit={CreateSchedule}
         >
            <div className="flex flex-col w-1/3">
               <label>Health Workers:</label>
               <select
                  required
                  name="id"
                  value={payload.id}
                  className="border border-blue px-2 py-[6px]  outline-none text-lg"
                  placeholder="Doc. Name"
                  onChange={OnChangeHandel}
               >
                  <option value="" disabled>
                     ------
                  </option>
                  {!doctors ? (
                     <option value="" disabled>
                        Loading...
                     </option>
                  ) : (
                     doctors.map((item) => (
                        <option key={item.id} value={item.id}>
                           {item.name}
                        </option>
                     ))
                  )}
               </select>
            </div>
            <div className="flex flex-col  w-1/3">
               <label>Date Time From:</label>
               <input
                  required
                  name="available_from"
                  value={payload.available_from}
                  type="datetime-local"
                  className="border border-blue px-2 py-1  outline-none text-md"
                  onChange={OnChangeHandel}
               />
            </div>
            <div className="flex flex-col  w-1/3">
               <label>Date Time To:</label>
               <input
                  required
                  type="datetime-local"
                  name="available_to"
                  value={payload.available_to}
                  min={payload.available_from}
                  className="border border-blue px-2 py-1  outline-none text-md"
                  onChange={OnChangeHandel}
               />
            </div>
         </form>

         <BlueButton
            className="ml-auto px-2  mt-3"
            form="schedule"
            type="submit"
         >
            Add Doctor
         </BlueButton>

         <Doctors />
      </div>
   );
};

export default ViewService;
