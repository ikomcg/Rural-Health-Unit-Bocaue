import style from "./style.module.scss";
import Card, { AddCard } from "../../../../components/card/Card";
import useFetchMedecines from "../../../../hooks/Medecines";
import { useNavigate } from "react-router-dom";
import NewService from "../../../shared/add-service/AddService";
import { JSXCSwal } from "../../../../components/swal/Swal";
import { CircularProgress } from "@mui/material";

const Medicines = () => {
   const medecines = useFetchMedecines();
   const navigate = useNavigate();
   const HandleClickMedecine = () => {
      JSXCSwal({
         children: <NewService path="medecines" storagepPath="medecines/" />,
         showConfirmButton: false,
      });
   };
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
            {medecines && <AddCard onClick={HandleClickMedecine} />}
         </div>
      </>
   );
};

export default Medicines;
