import React, { SetStateAction, useEffect, useState } from "react";
import style from "../../style.module.scss";
import { useParams } from "react-router-dom";
import DialogSlide from "../../../../../../components/mui/dialog/SlideModal";
import { AiFillCloseCircle } from "react-icons/ai";
import { BlueButton } from "../../../../../../components/button/BlueButton";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../firebase/Base";
import CSwal from "../../../../../../components/swal/Swal";
import useFetchInventory from "../../../../../../hooks/Inventory";

type PayloadType = object & Omit<Medecine, "created_at">;

type PostType = {
   payload: PayloadType;
   setPayload: React.Dispatch<SetStateAction<PayloadType | undefined>>;
};

const UpdateMedecine = ({ payload, setPayload }: PostType) => {
   const { id } = useParams();
   const [isCreate, setIsCreate] = useState(false);
   const [isPost, setIsPost] = useState(false);
   const inventory = useFetchInventory();

   useEffect(() => {
      if (!payload) return;

      setIsPost(true);
   }, [payload]);

   const OnClose = () => {
      setIsPost(false);
      setIsCreate(false);
   };

   const CreateMedecines = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!id) return;
      setIsPost(false);
      const swal = await CSwal({
         icon: "info",
         title: "Are you sure you want to save?",
         showCancelButton: true,
         showConfirmButton: true,
      });

      if (!swal) return setIsPost(true);

      setIsCreate(true);

      const data = {
         name: payload.name,
         batch_lot_no: payload.batch_lot_no,
         stock_in: payload.stock_in,
         category: payload.category,
         update_at: serverTimestamp(),
      };

      await updateDoc(doc(db, "medecines", id, "medecines", payload.id), data)
         .then(() => {
            OnClose();
            CSwal({
               icon: "success",
               title: "Update Successfully",
            });
         })
         .catch((err) => {
            CSwal({
               icon: "error",
               title: err,
            });
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
         <div className="p-3">
            <div className={style.header_post}>
               <h1>Update Medecine</h1>
               <button type="button" onClick={OnClose}>
                  <AiFillCloseCircle />
               </button>
            </div>
            <form
               className="flex flex-col gap-3 flex-nowrap mt-5"
               id="updateMedecineForm"
               onSubmit={CreateMedecines}
            >
               <div className="relative flex flex-row gap-3 mb-2">
                  <div className="flex flex-col w-1/3">
                     <label>Medecines Name:</label>
                     <select
                        id="category"
                        name="name"
                        className="border border-1 px-2 py-1 outline-none"
                        onChange={OnChangeHandle}
                        value={payload.name}
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
                     <label>Batch/Lot no:</label>
                     <input
                        required
                        name="batch_lot_no"
                        value={payload.batch_lot_no}
                        type="text"
                        className="border border-blue px-2 py-1  outline-none text-md"
                        onChange={OnChangeHandle}
                     />
                  </div>
                  <div className="flex flex-col  w-1/3">
                     <label>Stock In:</label>
                     <input
                        required
                        name="stock_in"
                        value={payload.stock_in}
                        type="number"
                        className="border border-blue px-2 py-1  outline-none text-md"
                        onChange={OnChangeHandle}
                     />
                  </div>
                  <div className="flex flex-col w-1/3">
                     <label>Category:</label>
                     <select
                        id="category"
                        name="category"
                        className="border border-1 px-2 py-1 outline-none"
                        onChange={OnChangeHandle}
                        value={payload.category}
                     >
                        <option value="">-----</option>
                        <option value="DELIVERY">DELIVERY</option>
                        <option value="RECEIVED STOCK">RECEIVED STOCK</option>
                        <option value="ADJUSTMENT">ADJUSTMENT</option>
                     </select>
                  </div>
               </div>
            </form>
            <div className="flex flex-row justify-between mt-8">
               <BlueButton
                  type="submit"
                  form="updateMedecineForm"
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

export default UpdateMedecine;
