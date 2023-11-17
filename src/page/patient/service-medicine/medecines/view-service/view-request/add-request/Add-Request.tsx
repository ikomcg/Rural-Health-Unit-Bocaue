import React, { SetStateAction, useContext, useState } from "react";
import DialogSlide from "../../../../../../../components/mui/dialog/SlideModal";
import style from "../../../style.module.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import { BlueButton } from "../../../../../../../components/button/BlueButton";
import { useFetchMedecineListService } from "../../../../../../../hooks/Medecines";
import { useParams } from "react-router-dom";
import { UserProvider } from "../../../../../../../context/UserProvider";
import { CreateRequestMedecineFrb } from "../../../../../../../firebase/Service/Request";
import CSwal from "../../../../../../../components/swal/Swal";

type PostType = {
   isPost: boolean;
   setIsPost: React.Dispatch<SetStateAction<boolean>>;
};

const AddRequest = ({ isPost, setIsPost }: PostType) => {
   const { id, name } = useParams();
   const { cookies } = useContext(UserProvider);
   const [isLoading, setIsLoading] = useState(false);
   const medecines = useFetchMedecineListService({ id: id });
   const [payload, setPayload] = useState({
      medecine_id: "",
      quantity: 0,
   });
   const OnClose = () => {
      setIsPost(false);
   };

   const SendRequest = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!id || !cookies || !name || !medecines) return;

      setIsLoading(true);
      const _data = await CreateRequestMedecineFrb({
         data: {
            patient_id: cookies.id,
            service_id: id,
            medicine_id: payload.medecine_id,
            quantity: payload.quantity,
            status: "pending",
         },
      });

      if (!_data) {
         return CSwal({
            icon: "error",
            title: "Error Send Request",
         });
      }
      OnClose();
      CSwal({
         icon: "success",
         title: "Send Request Successfully",
      }).then(() => {});
   };

   const OnChangeHandle = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
      const { name, value } = e.target;

      setPayload((prev) => ({ ...prev, [name]: value }));
   };

   const filterSelectMedicines = medecines?.find((item) => {
      if (item.id === payload.medecine_id) {
         return item;
      }
   });

   return (
      <DialogSlide
         fullWidth={true}
         maxWidth="xs"
         open={isPost}
         setOpen={OnClose}
      >
         <div className="p-3">
            <div className={style.header_post}>
               <h1>Request Medecine</h1>
               <button type="button" onClick={OnClose}>
                  <AiFillCloseCircle />
               </button>
            </div>

            <form
               id="sendRequest"
               className="flex flex-col gap-3"
               onSubmit={SendRequest}
            >
               <div className="flex flex-col w-full">
                  <label htmlFor="">Medecines:</label>
                  <select
                     required
                     value={payload.medecine_id}
                     name="medecine_id"
                     className="border border-blue py-2 px-2 mt-1"
                     onChange={OnChangeHandle}
                  >
                     <option value="" disabled>
                        ------
                     </option>

                     {medecines === undefined ? (
                        <option value="" disabled>
                           Loading...
                        </option>
                     ) : medecines === null ? (
                        <option value="" disabled>
                           Error Get Medecines...
                        </option>
                     ) : (
                        medecines.map((item) => (
                           <option key={item.id} value={item.id}>
                              {item.medicines.name}
                           </option>
                        ))
                     )}
                  </select>
               </div>
               <div className="flex flex-col  w-full">
                  <label htmlFor="">Quantity:</label>
                  <input
                     value={payload.quantity}
                     required
                     max={filterSelectMedicines?.stock_in}
                     name="quantity"
                     className="border border-blue py-[2px] px-2 mt-1"
                     type="number"
                     onChange={OnChangeHandle}
                  />
               </div>
            </form>
            <BlueButton
               type="submit"
               form="sendRequest"
               className="w-full mt-5 p-1"
               disabled={isLoading}
            >
               Send
            </BlueButton>
         </div>
      </DialogSlide>
   );
};

export default AddRequest;
