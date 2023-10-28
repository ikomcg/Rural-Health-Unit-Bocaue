import React, { SetStateAction, useContext, useState } from "react";
import DialogSlide from "../../../../../../../components/mui/dialog/SlideModal";
import style from "../../../style.module.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import { BlueButton } from "../../../../../../../components/button/BlueButton";
import { useParams } from "react-router-dom";
import { UserProvider } from "../../../../../../../context/UserProvider";
import { CreateRequestScheduleFrb } from "../../../../../../../firebase/Service/Request";
import { TimeStampValue } from "../../../../../../../shared/TimeStamp";
import Swal from "sweetalert2";

type PostType = {
   isPost: boolean;
   setIsPost: React.Dispatch<SetStateAction<boolean>>;
};

const AddRequest = ({ isPost, setIsPost }: PostType) => {
   const { id, name } = useParams();
   const { cookies } = useContext(UserProvider);
   const [requestDate, setRequestDate] = useState("");
   const [isLoading, seIsLoading] = useState(false);
   const OnClose = () => {
      setIsPost(false);
   };

   const SendRequest = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!id || !cookies || !name) return;

      const { first_name, last_name, middle_name } = cookies;
      seIsLoading(true);
      const _data = await CreateRequestScheduleFrb({
         data: {
            patient_id: cookies.id,
            patient_name: `${first_name} ${middle_name} ${last_name}`,
            service_id: id,
            service_name: name,
            request_date: TimeStampValue(requestDate),
            status: "pending",
         },
      });

      if (!_data) {
         return Swal.fire({
            icon: "error",
            title: "Error Send Request Schedule",
         });
      }
      OnClose();
      Swal.fire({
         icon: "success",
         title: "Send Request Successfully",
      }).then(() => {});
   };

   return (
      <DialogSlide
         fullWidth={true}
         maxWidth="sm"
         open={isPost}
         setOpen={OnClose}
      >
         <div className="p-5">
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
                     value={requestDate}
                     name="request_date"
                     onChange={(e) => setRequestDate(e.target.value)}
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
