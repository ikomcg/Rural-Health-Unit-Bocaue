import style from "./style.module.scss";
import Card, { AddCard } from "../../../../components/card/Card";
import useFetchMedecines from "../../../../hooks/Medecines";
import { useState } from "react";
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
            <AddCard onClick={HandleClickMedecine} />
         </div>

         {isMedecine && (
            <NewMedecine isPost={isMedecine} setIsPost={setIsMedecine} />
         )}
      </>
   );
};

export default Medicines;
