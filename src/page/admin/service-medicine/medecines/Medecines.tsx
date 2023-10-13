import style from "./style.module.scss";
import Card from "../../../../components/card/Card";
import useFetchMedecines from "../../../../hooks/Medecines";

const Medicines = () => {
   const medecines = useFetchMedecines();

   return (
      <div className={style.card}>
          {medecines === undefined ? (
            <h1 className="w-full text-center text-gray-400">Loading...</h1>
         ) : medecines === null ? (
            <h1 className="text-center text-gray-400">Something went wrong</h1>
         ) : (
            medecines.map((item) => (
               <Card key={item.id} title={item.name} bg={item.image} />
            ))
         )}
      </div>
   );
};

export default Medicines;
