import React, { useEffect, useState } from "react";
import style from "../../style.module.scss";
import useFetchDoctors from "../../../../../../hooks/Doctors";
import { useParams } from "react-router-dom";
import DialogSlide from "../../../../../../components/mui/dialog/SlideModal";
import { AiFillCloseCircle } from "react-icons/ai";
import { BlueButton } from "../../../../../../components/button/BlueButton";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../firebase/Base";
import Swal from "sweetalert2";
import { TimeStampValue } from "../../../../../../shared/TimeStamp";

type PostType = {
   payload: PayloadType;
   setPayload: React.Dispatch<React.SetStateAction<PayloadType | undefined>>;
};

const UpdateDoctors = ({ payload, setPayload }: PostType) => {
   const doctors = useFetchDoctors();
   const { id } = useParams();
   const [isPost, setIsPost] = useState(false);
   const [isCreate, setIsCreate] = useState(false);

   useEffect(() => {
      if (!payload) return;

      setIsPost(true);
   }, [payload]);

   const OnClose = () => {
      setIsPost(false);
      setPayload(undefined);
   };

   const UpdateSchedule = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!id || !doctors) return;
      setIsPost(false);
      Swal.fire({
         icon: "info",
         title: "Are you sure you want to save?",
         showCancelButton: true,
         showConfirmButton: true,
      }).then(async (res) => {
         if (res.isConfirmed) {
            setIsCreate(true);
            const doctor = doctors.find((item) => item.id === payload.user_id);

            const data = {
               user_id: payload.user_id,
               name: doctor?.name,
               available_from: TimeStampValue(payload.available_from),
               available_to: TimeStampValue(payload.available_from),
               update_at: serverTimestamp(),
            };

            await updateDoc(
               doc(db, "service", id, "schedules", payload.id),
               data
            )
               .then(() => {
                  OnClose();
                  Swal.fire({
                     icon: "success",
                     title: "Update Successfully",
                  });
               })
               .catch((err) => {
                  Swal.fire({
                     icon: "error",
                     title: err,
                  });
               });
         } else {
            setIsPost(true);
         }
      });
   };

   const OnChangeHandle = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
      const { name, value } = e.target;
      setPayload((prev) => (prev ? { ...prev, [name]: value } : undefined));
   };

   return (
      <DialogSlide
         fullWidth={true}
         maxWidth="md"
         open={isPost}
         setOpen={OnClose}
      >
         <div className="p-5">
            <div className={style.header_post}>
               <h1>Update Schedule</h1>
               <button type="button" onClick={OnClose}>
                  <AiFillCloseCircle />
               </button>
            </div>
            <form
               className="flex flex-col gap-3 flex-nowrap mt-5"
               id="schedule"
               onSubmit={UpdateSchedule}
            >
               <div className="relative flex flex-row gap-3 mb-2">
                  <div className="flex flex-col w-1/3">
                     <label>Health Workers:</label>
                     <select
                        required
                        name="user_id"
                        value={payload.user_id}
                        className="border border-blue px-2 py-[6px]  outline-none text-lg"
                        placeholder="Doc. Name"
                        onChange={OnChangeHandle}
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
                        onChange={OnChangeHandle}
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
                        onChange={OnChangeHandle}
                     />
                  </div>
               </div>
            </form>
            <div className="flex flex-row justify-between mt-8">
               <BlueButton
                  type="submit"
                  form="schedule"
                  className="ml-auto py-2"
                  disabled={isCreate}
               >
                  Update Schedule
               </BlueButton>
            </div>
         </div>
      </DialogSlide>
   );
};

export default UpdateDoctors;
