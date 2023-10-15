import { useParams } from "react-router-dom";
import MedList from "./medecines/Medecines";
import { BlueButton } from "../../../../../components/button/BlueButton";
import Request from "./view-request/Requests";
import { useState } from "react";
import Medecine from "./medecines/AddMedecines";

const ViewService = () => {
   const { name } = useParams();
   const [isAdd, setIsAdd] = useState(false);

   return (
      <>
         <div className="flex flex-col">
            <h1 className="text-blue text-2xl mt-10">{name}</h1>
            <BlueButton
               onClick={() => setIsAdd(true)}
               className="ml-auto px-2  mt-3"
               form="schedule"
               type="submit"
            >
               Add Medecines
            </BlueButton>

            <MedList />
            <br />
            <Request />
         </div>
         {isAdd && <Medecine isPost={isAdd} setIsPost={setIsAdd} />}
      </>
   );
};

export default ViewService;
