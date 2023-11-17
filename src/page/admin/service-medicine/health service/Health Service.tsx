import style from "./style.module.scss";
import Card, { AddCard } from "../../../../components/card/Card";
import useFetchService from "../../../../hooks/Service";
import { useNavigate } from "react-router-dom";
import NewService from "../../../shared/add-service/AddService";
import { JSXCSwal } from "../../../../components/swal/Swal";
import { CircularProgress } from "@mui/material";

const HealthService = () => {
   const service = useFetchService({ path: "service" });
   const navigate = useNavigate();

   const HandleClickService = () => {
      JSXCSwal({
         children: <NewService storagepPath="service/" path="service" />,
         showConfirmButton: false,
      });
   };

   return (
      <>
         <div className={service ? style.card : "flex items-center mt-40"}>
            {service === undefined ? (
               <div className="flex flex-col justify-center items-center w-full">
                  <CircularProgress />
                  <span className="text-sm">Please wait...</span>
               </div>
            ) : service === null ? (
               <h1 className="text-center text-gray-400">
                  Something went wrong
               </h1>
            ) : (
               service.map((item) => (
                  <Card
                     key={item.id}
                     title={item.name}
                     bg={item.image}
                     onClick={() => navigate(`${item.name}/${item.id}`)}
                  />
               ))
            )}
            {service && <AddCard onClick={HandleClickService} />}
         </div>
      </>
   );
};

export default HealthService;
