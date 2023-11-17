import { useParams } from "react-router-dom";
import MedecineList from "./medecines/Medicine/MedecinesList";
import { BlueButton } from "../../../../../components/button/BlueButton";
import Request from "./view-request/Requests";
import { useState } from "react";
import AddMedecine from "./medecines/Medicine/AddMedecines";
import AdjusmentList from "./medecines/Adjusment/AdjusmentList";
import AddAdjustment from "./medecines/Adjusment/AddAdjustment";

const ViewService = () => {
   const { name } = useParams();
   const [isAdd, setIsAdd] = useState(false);
   const [isAdjustment, setIsAdjustment] = useState(false);
   return (
      <>
         <div className="flex flex-col">
            <h1 className="text-blue text-2xl mt-10">{name}</h1>
            <BlueButton
               type="button"
               onClick={() => setIsAdd(true)}
               className="ml-auto px-2 py-1  mt-3"
            >
               Add Medicines
            </BlueButton>

            <MedecineList />
            <br />
            <BlueButton
               type="button"
               onClick={() => setIsAdjustment(true)}
               className="ml-auto px-2 py-1  mt-3"
            >
               Adjustment
            </BlueButton>
            <AdjusmentList />
            <br />
            <Request />
         </div>
         {isAdd && <AddMedecine isPost={isAdd} setIsPost={setIsAdd} />}
         {isAdjustment && (
            <AddAdjustment isPost={isAdjustment} setIsPost={setIsAdjustment} />
         )}
      </>
   );
};

export default ViewService;
