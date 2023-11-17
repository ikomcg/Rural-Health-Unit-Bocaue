import React, { FormEvent, SetStateAction, useState } from "react";
import DialogSlide from "../../../../components/mui/dialog/SlideModal";
import { BlueButton } from "../../../../components/button/BlueButton";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/Base";
import CSwal from "../../../../components/swal/Swal";

type UpdateInventoryType = {
   payload: Inventory | Inventory;
   medicines: MedecinesType[] | null | undefined;
   setPayload: React.Dispatch<SetStateAction<Inventory | null>>;
};
const UpdateInventory = ({
   setPayload,
   payload,
   medicines,
}: UpdateInventoryType) => {
   const [isSaving, setIsSaving] = useState(false);

   const OnClose = () => {
      setPayload(null);
   };

   const { name, descriptions, category } = payload;

   const UpdateInventory = async (e: FormEvent) => {
      e.preventDefault();

      const data = {
         name: payload.name,
         descriptions,
         category,
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
               title: err.code ?? "Network Error",
            });
         })
         .finally(() => {
            setIsSaving(false);
         });
   };

   const OnChangeHandle = (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
   ) => {
      const { name, value } = e.target;

      setPayload((prev) => (prev ? { ...prev, [name]: value } : null));
   };

   return (
      <DialogSlide
         fullWidth={true}
         maxWidth="sm"
         open={payload !== null}
         setOpen={OnClose}
      >
         <h1 className="text-blue text-2xl font-semibold text-center py-2 mb-3">
            Inventory
         </h1>
         <form
            className="flex flex-row flex-wrap gap-y-5 mb-3"
            onSubmit={UpdateInventory}
            id="inventory-create"
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
               <label htmlFor="category">Category:</label>
               <select
                  id="category"
                  name="category"
                  className="border border-1 px-2 py-1 outline-none"
                  onChange={OnChangeHandle}
                  value={category}
               >
                  <option value="">-----</option>
                  {!medicines ? (
                     <option value="" disabled>
                        Loading
                     </option>
                  ) : (
                     medicines.map((item) => (
                        <option value={item.id}>{item.name}</option>
                     ))
                  )}
               </select>
            </div>
            <div className="flex flex-col gap-2 w-full px-3">
               <label htmlFor="descriptions">Description</label>
               <textarea
                  value={descriptions}
                  name="descriptions"
                  id="descriptions"
                  required
                  className="border border-1 px-2 py-1 outline-none w-full"
                  onChange={OnChangeHandle}
               ></textarea>
            </div>
         </form>
         <div className="mb-3 flex justify-end">
            <BlueButton
               className="ml-auto mr-3 py-1"
               type="submit"
               form="inventory-create"
               disabled={isSaving}
            >
               Save
            </BlueButton>
         </div>
      </DialogSlide>
   );
};

export default UpdateInventory;
