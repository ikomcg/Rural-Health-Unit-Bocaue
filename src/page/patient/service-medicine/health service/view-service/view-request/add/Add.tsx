import React, { SetStateAction, useContext, useState } from "react";
import DialogSlide from "../../../../../../../components/mui/dialog/SlideModal";
import style from "../../../style.module.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import { BlueButton } from "../../../../../../../components/button/BlueButton";
import { useParams } from "react-router-dom";
import { UserProvider } from "../../../../../../../context/UserProvider";
import { CreateRequestScheduleFrb } from "../../../../../../../firebase/Service/Request";
import { TimeStampValue } from "../../../../../../../shared/TimeStamp";
import CSwal from "../../../../../../../components/swal/Swal";

type PostType = {
   isPost: boolean;
   setIsPost: React.Dispatch<SetStateAction<boolean>>;
};

const AddRequest = ({ isPost, setIsPost }: PostType) => {
   const { id, name } = useParams();
   const { cookies } = useContext(UserProvider);
   const [payload, setPayload] = useState({
      requestDate: "",
      reasons: "",
   });
   const [isLoading, seIsLoading] = useState(false);
   const OnClose = () => {
      setIsPost(false);
   };

   const SendRequest = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!id || !cookies || !name) return;

      seIsLoading(true);
      const _data = await CreateRequestScheduleFrb({
         data: {
            patient_id: cookies.id,
            service_id: id,
            service_name: name,
            request_date: TimeStampValue(payload.requestDate),
            reason: payload.reasons,
            status: "pending",
         },
      });

      if (!_data) {
         return CSwal({
            icon: "error",
            title: "Error Send Request Schedule",
         });
      }
      OnClose();

      CSwal({
         icon: "success",
         title: "Send Request Successfully",
      }).then(() => {});
   };

   const OnChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      setPayload((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };
   return (
      <DialogSlide
         fullWidth={true}
         maxWidth="sm"
         open={isPost}
         setOpen={OnClose}
      >
         <div className="p-3">
            <div className={style.header_post}>
               <h1>Request Schedule</h1>
               <button type="button" onClick={OnClose}>
                  <AiFillCloseCircle />
               </button>
            </div>

            <form onSubmit={SendRequest} id="sendRequest">
               <div className="flex flex-col">
                  <label htmlFor="">Request Date</label>
                  <input
                     className="border border-blue py-1 px-2 mt-1"
                     type="datetime-local"
                     required
                     value={payload.requestDate}
                     name="requestDate"
                     onChange={OnChange}
                  />
               </div>
               <div className="flex flex-col mt-3">
                  <label htmlFor="">Reason:</label>
                  <textarea
                     className="border border-blue py-1 px-2 mt-1"
                     required
                     value={payload.reasons}
                     name="reasons"
                     onChange={OnChange}
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
