import style from "./style.module.scss";
import Card from "../../../../components/card/Card";
import useFetchService from "../../../../hooks/Service";
import { useNavigate } from "react-router-dom";

const HealthService = () => {
   const service = useFetchService();
   const navigate = useNavigate();


   return (
      <>
         <div className={style.card}>
            {service === undefined ? (
               <h1 className="w-full text-center text-gray-400">Loading...</h1>
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