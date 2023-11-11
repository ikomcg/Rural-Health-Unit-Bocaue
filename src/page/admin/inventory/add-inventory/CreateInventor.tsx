import React, { FormEvent, SetStateAction, useState } from "react";
import DialogSlide from "../../../../components/mui/dialog/SlideModal";
import { BlueButton } from "../../../../components/button/BlueButton";
import { CreateInventoryFrb } from "../../../../firebase/inventory/Create";
import CSwal from "../../../../components/swal/Swal";
type PostType = {
   isPost: boolean;
   setIsPost: React.Dispatch<SetStateAction<boolean>>;
};
const CreateInventor = ({ isPost, setIsPost }: PostType) => {
   const [isSaving, setIsSaving] = useState(false);
   const OnClose = () => {
      if (isSaving) return;
      setPayload({
         name: "",
         total_dispensed: "",
         total_issued: "",
         availability: "",
      });
      setIsPost(false);
   };

   const [payload, setPayload] = useState({
      name: "",
      total_dispensed: "",
      total_issued: "",
      availability: "",
   });

   const { name, total_dispensed, total_issued, availability } = payload;

   const CreateInventory = async (e: FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      const data = await CreateInventoryFrb({
         data: payload,
      });
      setIsSaving(false);

      if (!data) {
         CSwal({
            icon: "error",
            title: "Somenting went wrong",
            text: "Failed to Save",
         });
         return;
      }
      OnClose();

      CSwal({
         icon: "success",
         title: "Successfully Added",
      });
   };

   const OnChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setPayload((prev) => ({ ...prev, [name]: value }));
   };

   return (
      <DialogSlide
         fullWidth={true}
         maxWidth="sm"
         open={isPost}
         setOpen={OnClose}
      >
         <h1 className="text-blue text-2xl font-semibold text-center py-2 mb-3">
            Inventory
         </h1>
         <form
            className="flex flex-row flex-wrap gap-y-5 mb-3"
            onSubmit={CreateInventory}
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
               className="ml-auto mr-3 py-1"
               type="submit"
               disabled={isSaving}
            >
               Save
            </BlueButton>
         </form>
      </DialogSlide>
   );
};

export default CreateInventor;
