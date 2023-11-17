import style from "./style.module.scss";
import Card from "../../../../components/card/Card";
import useFetchService from "../../../../hooks/Service";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const HealthService = () => {
   const service = useFetchService({ path: "service" });
   const navigate = useNavigate();

   return (
      <>
         <div className={service ? style.card : "flex items-center mt-40"}>
            {service === undefined ? (
               <div className="flex flex-col justify-center items-center w-full row-span-4">
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
         </div>
      </>
   );
};

export default HealthService;
