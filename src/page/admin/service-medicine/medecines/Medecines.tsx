import style from "./style.module.scss";
import Card, { AddCard } from "../../../../components/card/Card";
import useFetchMedecines from "../../../../hooks/Medecines";
import { useNavigate } from "react-router-dom";
import NewService from "../../../shared/add-service/AddService";
import { JSXCSwal } from "../../../../components/swal/Swal";

const Medicines = () => {
   const medecines = useFetchMedecines();
   const navigate = useNavigate();
   const HandleClickMedecine = () => {
      JSXCSwal({
         children: <NewService path='medecines' storagepPath="medecines/" />,
         showConfirmButton: false,
      });
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
            {medecines && <AddCard onClick={HandleClickMedecine} />}
         </div>
      </>
   );
};

export default Medicines;
