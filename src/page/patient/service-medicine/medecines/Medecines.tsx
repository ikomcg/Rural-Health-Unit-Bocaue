import style from "./style.module.scss";
import Card from "../../../../components/card/Card";
import useFetchMedecines from "../../../../hooks/Medecines";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Medicines = () => {
   const medecines = useFetchMedecines();
   const navigate = useNavigate();

   return (
      <>
         <div className={medecines ? style.card : "flex items-center mt-40"}>
            {medecines === undefined ? (
               <div className="flex flex-col justify-center items-center w-full">
                  <CircularProgress />
                  <span className="text-sm">Please wait...</span>
               </div>
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
      </>
   );
};

export default Medicines;
