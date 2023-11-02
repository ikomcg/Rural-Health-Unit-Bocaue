import React, { FormEvent, SetStateAction, useState } from "react";
import DialogSlide from "../../../../components/mui/dialog/SlideModal";
import { BlueButton } from "../../../../components/button/BlueButton";
import CSwal from "../../../../components/swal/Swal";
import { RedButton } from "../../../../components/button/RedButton";
import { serverTimestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase/Base";

type UpdateInventoryType = {
   payload: Inventory;
   setPayload: React.Dispatch<SetStateAction<Inventory | null>>;
};
const UpdateInventory = ({ setPayload, payload }: UpdateInventoryType) => {
   const [isSaving, setIsSaving] = useState(false);

   const OnClose = () => {
      setPayload(null);
   };

   const { name, total_dispensed, total_issued, availability } = payload;

   const UpdateInventory = async (e: FormEvent) => {
      e.preventDefault();

      const data = {
         name: payload.name,
         total_issued: payload.total_issued,
         availability: payload.availability,
         total_dispensed: payload.total_dispensed,
         updated_at: serverTimestamp(),
      };
      setIsSaving(true);
      await updateDoc(doc(db, "inventory", payload.id), data)
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
         })
         .finally(() => {
            setIsSaving(false);
         });
   };

   const OnChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setPayload((prev) => (prev ? { ...prev, [name]: value } : null));
   };

   const DeleteInventory = async () => {
      if (isSaving) return;
      const swal = await CSwal({
         icon: "info",
         title: "Are you sure you want to delete?",
         showCancelButton: true,
         showConfirmButton: true,
      });

      if (!swal) return;

      await deleteDoc(doc(db, "inventory", payload.id))
         .then(() => {
            return CSwal({
               icon: "success",
               text: "Deleted Successfuly",
            });
         })
         .catch(() => {
            return CSwal({
               icon: "error",
               text: "Failed to Deleted",
            });
         });
   };

   return (
      <DialogSlide
         fullWidth={true}
         maxWidth="sm"
         open={payload !== null}
         setOpen={OnClose}
         tabIndex={1}
      >
         <h1 className="text-blue text-2xl font-semibold text-center py-2 mb-3">
            Inventory
         </h1>
         <form
            className="flex flex-row flex-wrap gap-y-5 mb-3"
            onSubmit={UpdateInventory}
         >
            <div className="flex flex-col gap-2 w-1/2 px-3">
               <label htmlFor="name">Name:</label>
               <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  name="name"
                  className="border border-1 px-2 py-1 outline-none"
                  onChange={OnChangeHandle}
               />
            </div>
            <div className="flex flex-col gap-2 w-1/2 px-3">
               <label htmlFor="total_issued">Total Issued:</label>
               <input
                  type="number"
                  id="total_issued"
                  value={total_issued}
                  required
                  name="total_issued"
                  className="border border-1 px-2 py-1 outline-none"
                  onChange={OnChangeHandle}
               />
            </div>
            <div className="flex flex-col gap-2 w-1/2 px-3">
               <label htmlFor="total_dispensed">Total Dispensed:</label>
               <input
                  type="number"
                  id="total_dispensed"
                  value={total_dispensed}
                  required
                  name="total_dispensed"
                  className="border border-1 px-2 py-1 outline-none"
                  onChange={OnChangeHandle}
               />
            </div>
            <div className="flex flex-col gap-2 w-1/2 px-3">
               <label htmlFor="availability">Availability:</label>
               <input
                  type="number"
                  id="availability"
                  required
                  value={availability}
                  name="availability"
                  className="border border-1 px-2 py-1 outline-none"
                  onChange={OnChangeHandle}
               />
            </div>
            <BlueButton
               className="ml-auto mr-1 py-1"
               type="submit"
               disabled={isSaving}
            >
               Save
            </BlueButton>
            <RedButton type="button" className="mr-3" onClick={DeleteInventory}>
               Delete
            </RedButton>
         </form>
      </DialogSlide>
   );
};

export default UpdateInventory;
