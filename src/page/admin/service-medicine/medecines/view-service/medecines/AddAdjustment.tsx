import React, { SetStateAction, useState } from "react";
import style from "../../style.module.scss";
import { useParams } from "react-router-dom";
import DialogSlide from "../../../../../../components/mui/dialog/SlideModal";
import { AiFillCloseCircle } from "react-icons/ai";
import { BlueButton } from "../../../../../../components/button/BlueButton";
import { MdAssignmentAdd, MdOutlineRemoveCircleOutline } from "react-icons/md";
import uuid from "react-uuid";
import CSwal from "../../../../../../components/swal/Swal";
import useFetchInventory from "../../../../../../hooks/Inventory";
import { CreateAdjustmentMedecineFrb } from "../../../../../../firebase/Service/Request";

type PostType = {
   isPost: boolean;
   setIsPost: React.Dispatch<SetStateAction<boolean>>;
};
type PayloadType = {
   id: string;
   name: string;
   reason: string;
   stock_out: string | number;
   status: string;
};

const AddAdjustment = ({ isPost, setIsPost }: PostType) => {
   const { id } = useParams();
   const [isCreate, setIsCreate] = useState(false);
   const [payload, setPayload] = useState<PayloadType[]>([
      {
         id: uuid(),
         name: "",
         reason: "",
         stock_out: "",
         status: "pending",
      },
   ]);

   const inventory = useFetchInventory();

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
         reason: item.reason,
         stock_out: item.stock_out,
      }));

      if (_data.length === 0) return;
      setIsCreate(true);
      let index = 0;
      do {
         const data = await CreateAdjustmentMedecineFrb({
            data: {
               medicine_id: _data[index].name,
               stock_out: _data[index].stock_out,
               reason: _data[index].reason,
            },
         });

         if (!data) {
            CSwal({
               icon: "error",
               title: "Something went wrong",
               text: "Failed to Save",
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
            CSwal({
               icon: "success",
               title: "Added Successfully",
            });
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
         reason: "",
         stock_out: "",
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
         <div className="p-3">
            <div className={style.header_post}>
               <h1>Adjustment</h1>
               <button type="button" onClick={OnClose}>
                  <AiFillCloseCircle />
               </button>
            </div>
            <form
               className="flex flex-col gap-3 flex-nowrap mt-5"
               id="adjustmentForm"
               onSubmit={CreateMedecines}
            >
               {payload.map((item) => (
                  <Form
                     key={item.id}
                     item={item}
                     OnChangeHandle={OnChangeHandle}
                     OnRemove={OnRemoveHandle}
                     inventory={inventory}
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
                  form="adjustmentForm"
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

export default AddAdjustment;

type FormType = {
   item: PayloadType;
   OnRemove: (id: string) => void;
   OnChangeHandle: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      uuid: string
   ) => void;
   inventory: InventoryList[] | null | undefined;
};
const Form = ({ item, OnChangeHandle, OnRemove, inventory }: FormType) => {
   return (
      <div className="relative flex flex-row gap-3 mb-2">
         <div className="flex flex-col w-1/3">
            <label>Medecines Name:</label>
            <select
               id="name"
               name="name"
               required
               className="border border-1 px-2 py-2 outline-none"
               onChange={(e) => OnChangeHandle(e, item.id)}
               value={item.name}
            >
               <option value="">-----</option>
               {!inventory ? (
                  <option value="" disabled>
                     Loading
                  </option>
               ) : (
                  inventory.map((item) => (
                     <option value={item.id}>{item.name}</option>
                  ))
               )}
            </select>
         </div>
         <div className="flex flex-col  w-1/3">
            <label>Reason:</label>
            <select
               id="reason"
               required
               name="reason"
               className="border border-1 px-2 py-2 outline-none"
               onChange={(e) => OnChangeHandle(e, item.id)}
               value={item.reason}
            >
               <option value="">-----</option>
               <option value="EXPIRED">EXPIRED</option>
               <option value="TRANSFER">TRANSFER</option>
            </select>
         </div>
         <div className="flex flex-col w-1/3">
            <label>Stock Out:</label>
            <input
               required
               name="stock_out"
               value={item.stock_out}
               type="number"
               className="border border-blue px-2 py-[5px]  outline-none"
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
