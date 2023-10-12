import style from "./style.module.scss";
import Card from "../../../../components/card/Card";

const Medicines = () => {
   return (
      <div className={style.card}>
         <Card
            title="Vitamins"
            bg="/image/service-medicine/general_consultation.jpg"
         ></Card>
         <Card
            title="Maintenance"
            bg="/image/service-medicine/general_consultation.jpg"
         ></Card>
         <Card
            title="Antibiotic"
            bg="/image/service-medicine/general_consultation.jpg"
         ></Card>
         <Card
            title="For Kids"
            bg="/image/service-medicine/general_consultation.jpg"
         ></Card>
      </div>
   );
};

export default Medicines;
