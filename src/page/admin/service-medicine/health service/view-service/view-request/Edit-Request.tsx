import React, { useState } from "react";
import DialogSlide from "../../../../../../components/mui/dialog/SlideModal";
import { BlueButton } from "../../../../../../components/button/BlueButton";
import { RedButton } from "../../../../../../components/button/RedButton";
import style from "./style.module.scss";
import useFetchUsers from "../../../../../../hooks/Users";
import moment from "moment";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../firebase/Base";
import { CreateRapidApi } from "../../../../../../api/SMS/SendSMS";
import CSwal from "../../../../../../components/swal/Swal";

type EditRequestType = {
   item: RequestService | null;
   setEditSchedule: React.Dispatch<React.SetStateAction<RequestService | null>>;
};
const EditRequest = ({ item, setEditSchedule }: EditRequestType) => {
   const OnClose = () => {
      setEditSchedule(null);
   };

   const doctors = useFetchUsers({
      role: ["health-worker", "public health nurse"],
   });
   const [payload, setPayload] = useState({
      status: "",
      doctor: "",
   });

   const OnChangeStatus = async (status: string) => {
      if (!item) return;

      if (status === "approve" && payload.doctor === "") return;

      await updateDoc(doc(db, "schedules", item.id), {
         status,
         doctor_assign: status === "approve" ? payload.doctor : "",
      })
         .then(async () => {
            await CreateRapidApi({
               endPoint: "sms/send",
               token: "Y291cnNlaGVyN0BnbWFpbC5jb206OTE0QzY4M0YtM0NCMy0xRkY0LTBFRUQtRTMxMUZENEFBQkM2",
               data: {
                  messages: [
                     {
                        from: "RHU",
                        body: `Your Schedule ${moment(
                           item.request_date.toISOString()
                        )
                           .utcOffset(8)
                           .format("LLL")} in RHU Bocaue has been ${status}`,
                        to: item.patient.contact_no,
                     },
                  ],
               },
            }).then(() => {
               CSwal({
                  icon: "success",
                  title: `SCHEDULE ${
                     status === "approve" ? "APPROVED" : "DECLINE"
                  }`,
               });
               OnClose();
            });
         })
         .catch((err) => {
            CSwal({
               icon: "error",
               title: err,
            });
         });
   };

   const OnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;

      setPayload((prev) => ({
         ...prev,
         [name]: value,
      }));
   };
   return (
      <DialogSlide
         fullWidth={true}
         maxWidth="md"
         open={item !== null}
         setOpen={OnClose}
      >
         <div className="p-3">
            <div className={style.header_post}>
               <h1>Schedule</h1>
               <button type="button"></button>
            </div>
            <div className="flex flex-row gap-3 flex-nowrap mt-5" id="schedule">
               <div className="flex flex-col w-1/3">
                  <label htmlFor="" className="text-blue">
                     Patient Name:
                  </label>
                  <span>{item?.patient.full_name}</span>
               </div>

               <div className="flex flex-col w-1/3">
                  <label htmlFor="" className="text-blue">
                     Schedule:
                  </label>
                  <span>
                     {" "}
                     {moment(item?.request_date.toISOString())
                        .utcOffset(8)
                        .format("LLL")}
                  </span>
               </div>
               <div className="flex flex-col w-1/3">
                  <label className="text-blue">Assigned doctor:</label>
                  <select
                     name="doctor"
                     value={payload.doctor}
                     className="border border-blue px-2 py-[6px]  outline-none text-lg"
                     onChange={OnChange}
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
                              {item.full_name}
                           </option>
                        ))
                     )}
                  </select>
               </div>
            </div>
            <div className="flex flex-row justify-between mt-8 gap-2">
               <BlueButton
                  type="submit"
                  form="schedule"
                  className="ml-auto py-2"
                  onClick={() => OnChangeStatus("approve")}
                  disabled={item?.status === "approve"}
               >
                  Approved
               </BlueButton>
               <RedButton onClick={() => OnChangeStatus("decline")}>
                  Decline
               </RedButton>
            </div>
         </div>
      </DialogSlide>
   );
};

export default EditRequest;
