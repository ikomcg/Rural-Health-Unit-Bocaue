import React, { SetStateAction, useEffect, useState } from "react";
import style from "../../style.module.scss";
import { useParams } from "react-router-dom";
import DialogSlide from "../../../../../../components/mui/dialog/SlideModal";
import { AiFillCloseCircle } from "react-icons/ai";
import { BlueButton } from "../../../../../../components/button/BlueButton";
import { MdAssignmentAdd, MdOutlineRemoveCircleOutline } from "react-icons/md";
import uuid from "react-uuid";
import { CreateMedecineListFrb } from "../../../../../../firebase/Service/Create";
import Swal from "sweetalert2";

type PostType = {
   isPost: boolean;
   setIsPost: React.Dispatch<SetStateAction<boolean>>;
};
type PayloadType = {
   id: string;
   name: string;
   descriptions: string;
   stock: number;
   status: string;
};

const AddDoctors = ({ isPost, setIsPost }: PostType) => {
   const { id } = useParams();
   const [isCreate, setIsCreate] = useState(false);
   const [payload, setPayload] = useState<PayloadType[]>([
      {
         id: uuid(),
         name: "",
         descriptions: "",
         stock: 0,
         status: "pending",
      },
   ]);

   const OnClose = () => {
      setIsPost(false);
   };

   const CreateMedecines = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!id) return;
      const filterData = payload.filter((item) => item.status !== "success");

      const _data = filterData.map((item) => ({
         id: item.id,
         name: item.name,
         descriptions: item.descriptions,
         stock: item.stock,
      }));

      if (_data.length === 0) return;
      setIsCreate(true);
      let index = 0;
      do {
         const data = await CreateMedecineListFrb({
            data: {
               name: _data[index].name,
               descriptions: _data[index].descriptions,
               stock: _data[index].stock,
            },
            id,
         });

         if (!data) {
            Swal.fire({
               icon: "error",
               title: "Something went wrong",
               text: "Failed to Add Schedule",
            });
            return;
         } else {
            setPayload((prev) => [
               ...prev.map((item) => {
                  if (item.id === _data[index].id) {
                     return {
                        ...item,
                        status: "success",
                     };
                  }
                  return item;
               }),
            ]);
         }

         index++;
         if (index === _data.length) {
            OnClose();
         }
      } while (payload.length !== index);
   };

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
         name: "",
         descriptions: "",
         stock: 0,
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
               <h1>Medecines</h1>
               <button type="button" onClick={OnClose}>
                  <AiFillCloseCircle />
               </button>
            </div>
            <form
               className="flex flex-col gap-3 flex-nowrap mt-5"
               id="schedule"
               onSubmit={CreateMedecines}
            >
               {payload.map((item) => (
                  <Form
                     key={item.id}
                     item={item}
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
                  Add Medecines
               </BlueButton>
            </div>
         </div>
      </DialogSlide>
   );
};

export default AddDoctors;

type FormType = {
   item: PayloadType;
   OnRemove: (id: string) => void;
   OnChangeHandle: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      uuid: string
   ) => void;
};
const Form = ({ item, OnChangeHandle, OnRemove }: FormType) => {
   return (
      <div className="relative flex flex-row gap-3 mb-2">
         <div className="flex flex-col w-1/3">
            <label>Medecines Name:</label>
            <input
               required
               name="name"
               value={item.name}
               type="text"
               className="border border-blue px-2 py-1  outline-none text-md"
               onChange={(e) => OnChangeHandle(e, item.id)}
            />
         </div>
         <div className="flex flex-col  w-1/3">
            <label>Descriptions:</label>
            <input
               required
               name="descriptions"
               value={item.descriptions}
               type="text"
               className="border border-blue px-2 py-1  outline-none text-md"
               onChange={(e) => OnChangeHandle(e, item.id)}
            />
         </div>
         <div className="flex flex-col  w-1/3">
            <label>Stock:</label>
            <input
               required
               name="stock"
               value={item.stock}
               type="number"
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
