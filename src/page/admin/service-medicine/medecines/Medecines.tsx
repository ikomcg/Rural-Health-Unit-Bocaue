import style from "./style.module.scss";
import Card from "../../../../components/card/Card";
import useFetchMedecines from "../../../../hooks/Medecines";
import { useState } from "react";
import { BlueButton } from "../../../../components/button/BlueButton";
import { BsPlus } from "react-icons/bs";
import NewMedecine from "./add/Add";
import { useNavigate } from "react-router-dom";

const Medicines = () => {
   const medecines = useFetchMedecines();
   const [isMedecine, setIsMedecine] = useState(false);
   const navigate = useNavigate();
   const HandleClickMedecine = () => {
      setIsMedecine((prev) => !prev);
   };
   return (
      <>
         <BlueButton
            className="flex flex-row gap-1 py-1 items-center ml-auto"
            onClick={HandleClickMedecine}
         >
            <BsPlus className="text-lg" />
            Add Medecine
         </BlueButton>
         <div className={style.card}>
            {medecines === undefined ? (
               <h1 className="w-full text-center text-gray-400">Loading...</h1>
            ) : medecines === null ? (
               <h1 className="text-center text-gray-400">
                  Something went wrong
               </h1>
            ) : (
               medecines.map((item) => (
                  <Card
                     key={item.id}
                     title={item.name}
                     bg={item.image}
                     onClick={() => navigate(`${item.name}/${item.id}`)}
                  />
               ))
            )}
         </div>

         {isMedecine && (
            <NewMedecine isPost={isMedecine} setIsPost={setIsMedecine} />
         )}
      </>
   );
};

export default Medicines;
