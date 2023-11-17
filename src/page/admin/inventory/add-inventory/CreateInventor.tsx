import React, { FormEvent, SetStateAction, useState } from "react";
import DialogSlide from "../../../../components/mui/dialog/SlideModal";
import { BlueButton } from "../../../../components/button/BlueButton";
import { CreateInventoryFrb } from "../../../../firebase/inventory/Create";
import CSwal from "../../../../components/swal/Swal";
type PostType = {
   isPost: boolean;
   setIsPost: React.Dispatch<SetStateAction<boolean>>;
   medicines: MedecinesType[] | null | undefined;
};
const CreateInventor = ({ isPost, setIsPost, medicines }: PostType) => {
   const [isSaving, setIsSaving] = useState(false);
   const OnClose = () => {
      if (isSaving) return;
      setPayload({
         name: "",
         category: "",
         descriptions: "",
      });
      setIsPost(false);
   };

   const [payload, setPayload] = useState({
      name: "",
      category: "",
      descriptions: "",
   });

   const { name, descriptions, category } = payload;

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

   const OnChangeHandle = (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
   ) => {
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
            id="inventory"
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
                  className="border border-1 px-2 py-1 outline-none w-full"
                  onChange={OnChangeHandle}
               ></textarea>
            </div>
         </form>
         <div className="mb-3 flex justify-end">
            <BlueButton
               className="ml-auto mr-3 py-1"
               type="submit"
               form="inventory"
               disabled={isSaving}
            >
               Save
            </BlueButton>
         </div>
      </DialogSlide>
   );
};

export default CreateInventor;
