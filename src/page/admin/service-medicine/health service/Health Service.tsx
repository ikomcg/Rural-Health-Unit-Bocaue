import style from "./style.module.scss";
import Card from "../../../../components/card/Card";
import useFetchService from "../../../../hooks/Service";
import { useNavigate } from "react-router-dom";
import { BlueButton } from "../../../../components/button/BlueButton";
import { BsPlus } from "react-icons/bs";
import { useState } from "react";
import NewService from "./add/Add";

const HealthService = () => {
   const service = useFetchService();
   const navigate = useNavigate();
   const [isService, setIsService] = useState(false);

   const HandleClickService = () => {
      setIsService((prev) => !prev);
   };

   return (
      <>
         <BlueButton
            className="flex flex-row gap-1 py-1 items-center ml-auto"
            onClick={HandleClickService}
         >
            <BsPlus className="text-lg" />
            Add Service
         </BlueButton>
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
         {isService && (
            <NewService isPost={isService} setIsPost={setIsService} />
         )}
      </>
   );
};

export default HealthService;
