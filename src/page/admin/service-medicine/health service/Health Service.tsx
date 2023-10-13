import style from "./style.module.scss";
import Card from "../../../../components/card/Card";
import useFetchService from "../../../../hooks/Service";

const HealthService = () => {
   const service = useFetchService();

   return (
      <div className={style.card}>
         {service === undefined ? (
            <h1 className="w-full text-center text-gray-400">Loading...</h1>
         ) : service === null ? (
            <h1 className="text-center text-gray-400">Something went wrong</h1>
         ) : (
            service.map((item) => (
               <Card key={item.id} title={item.name} bg={item.image} />
            ))
         )}
      </div>
   );
};

export default HealthService;
