import React, { SetStateAction, useEffect, useState } from "react";
import style from "../../style.module.scss";
import useFetchUsers from "../../../../../../hooks/Users";
import { useParams } from "react-router-dom";
import DialogSlide from "../../../../../../components/mui/dialog/SlideModal";
import { AiFillCloseCircle } from "react-icons/ai";
import { BlueButton } from "../../../../../../components/button/BlueButton";
import { MdAssignmentAdd, MdOutlineRemoveCircleOutline } from "react-icons/md";
import uuid from "react-uuid";
import { TimeStampValue } from "../../../../../../shared/TimeStamp";
import { CreateServiceScheduleFrb } from "../../../../../../firebase/Service/Create";
import CSwal from "../../../../../../components/swal/Swal";

type PostType = {
   isPost: boolean;
   setIsPost: React.Dispatch<SetStateAction<boolean>>;
};
type PayloadType = {
   id: string;
   user_id: string;
   name: string;
   available_from: string;
   available_to: string;
   status?: string; //pending | success | error
};

const AddDoctors = ({ isPost, setIsPost }: PostType) => {
   const doctors = useFetchUsers({
      role: ["health-worker", "public health nurse"],
   });
   const { id } = useParams();
   const [isCreate, setIsCreate] = useState(false);
   const [payload, setPayload] = useState<PayloadType[]>([
      {
         id: uuid(),
         user_id: "",
         name: "",
         available_from: "",
         available_to: "",
         status: "pending",
      },
   ]);

   const OnClose = () => {
      //   if (isCreate) return;
      setIsPost(false);
   };

   const CreateSchedule = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!id || !doctors) return;

      const filterData = payload.filter((item) => item.status != "success");

      const _data = filterData.map((item) => {
         const doctor = doctors.find((doc) => doc.id === item.user_id);

         return {
            user_id: item.user_id,
            name: doctor?.full_name ?? "",
            available_from: TimeStampValue(item.available_from),
            available_to: TimeStampValue(item.available_to),
         };
      });

      if (_data.length === 0) return;
      setIsCreate(true);
      let index = 0;
      do {
         const data = await CreateServiceScheduleFrb({
            data: _data[index],
            id,
         });

         if (!data) {
            setPayload((prev) => [
               ...prev.map((item) => {
                  if (item.id === payload[index].id) {
                     return {
                        ...item,
                        status: "error",
                     };
                  }
                  return item;
               }),
            ]);
         } else {
            setPayload((prev) => [
               ...prev.map((item) => {
                  if (item.id === payload[index].id) {
                     return {
                        ...item,
                        status: "success",
                     };
                  }
                  return item;
               }),
            ]);
         }

         if (index === payload.length) {
            setIsCreate(false);
         }

         index++;
      } while (payload.length !== index);
   };
   const pending = payload.some((item) => item.status === "pending");
   const error = payload.some((item) => item.status === "error");
   useEffect(() => {
      if (pending) return;

      if (error) {
         CSwal({
            icon: "error",
            title: "Something went wrong",
            text: "Failed to Save",
         });
         return;
      }
      CSwal({
         icon: "success",
         title: "Schedule Added Successfully",
      });
      OnClose();
   }, [payload]);

   const OnChangeHandle = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      uuid: string
   ) => {
      const { name, value } = e.target;

      setPayload((prev) => [
         ...prev.map((item) => {
            if (item.id === uuid) {
               return {
                  ...item,
                  [name]: value,
               };
            }
            return item;
         }),
      ]);
   };

   const OnRemoveHandle = (id: string) => {
      if (payload.length === 1) return;

      const filterPayload = payload.filter((item) => item.id !== id);
      setPayload(filterPayload);
   };

   const AddForm = () => {
      const form = {
         id: uuid(),
         user_id: "",
         name: "",
         available_from: "",
         available_to: "",
         status: "pending",
      };
      setPayload((prev) => [...prev.concat(form)]);
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
               <h1>Health Workers Schedule</h1>
               <button type="button" onClick={OnClose}>
                  <AiFillCloseCircle />
               </button>
            </div>
            <form
               className="flex flex-col gap-3 flex-nowrap mt-5"
               id="schedule"
               onSubmit={CreateSchedule}
            >
               {payload.map((item) => (
                  <Form
                     key={item.id}
                     item={item}
                     doctors={doctors}
                     OnChangeHandle={OnChangeHandle}
                     OnRemove={OnRemoveHandle}
                  />
               ))}

               <button
                  type="button"
                  className={style.addForm}
                  onClick={AddForm}
                  disabled={isCreate}
               >
                  <MdAssignmentAdd />
               </button>
            </form>
            <div className="flex flex-row justify-between mt-8">
               <BlueButton
                  type="submit"
                  form="schedule"
                  className="ml-auto py-2"
                  disabled={isCreate}
               >
                  Save
               </BlueButton>
            </div>
         </div>
      </DialogSlide>
   );
};

export default AddDoctors;

type FormType = {
   item: PayloadType;
   doctors: UserType[] | undefined | null;
   OnRemove: (id: string) => void;
   OnChangeHandle: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      uuid: string
   ) => void;
};
export const Form = ({ item, doctors, OnChangeHandle, OnRemove }: FormType) => {
   return (
      <div className="relative flex flex-row gap-3 mb-2">
         <div className="flex flex-col w-1/3">
            <label>Health Workers:</label>
            <select
               required
               name="user_id"
               value={item.user_id}
               className="border border-blue px-2 py-[6px]  outline-none text-lg"
               placeholder="Doc. Name"
               onChange={(e) => OnChangeHandle(e, item.id)}
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
         <div className="flex flex-col  w-1/3">
            <label>Date Time From:</label>
            <input
               required
               name="available_from"
               value={item.available_from}
               type="datetime-local"
               className="border border-blue px-2 py-1  outline-none text-md"
               onChange={(e) => OnChangeHandle(e, item.id)}
            />
         </div>
         <div className="flex flex-col  w-1/3">
            <label>Date Time To:</label>
            <input
               required
               type="datetime-local"
               name="available_to"
               value={item.available_to}
               min={item.available_from}
               className="border border-blue px-2 py-1  outline-none text-md"
               onChange={(e) => OnChangeHandle(e, item.id)}
            />
         </div>
         <button
            className="absolute right-0 text-red-500 hover:bg-red-500 hover:text-white rounded-xl"
            title="remove"
            type="button"
            onClick={() => OnRemove(item.id)}
         >
            <MdOutlineRemoveCircleOutline />
         </button>
      </div>
   );
};
