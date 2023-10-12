import style from "./style.module.scss";
import Card from "../../../../components/card/Card";

const HealthService = () => {
   return (
      <div className={style.card}>
         <Card
            title="General Consultations"
            bg="/image/service-medicine/general_consultation.jpg"
         ></Card>
         <Card
            title="Family Planning"
            bg="/image/service-medicine/general_consultation.jpg"
         ></Card>
         <Card
            title="Laboratory Examinations"
            bg="/image/service-medicine/general_consultation.jpg"
         ></Card>
         <Card
            title="Communication Desease"
            bg="/image/service-medicine/general_consultation.jpg"
         ></Card>
         <Card
            title="Dental Services"
            bg="/image/service-medicine/general_consultation.jpg"
         ></Card>
      </div>
   );
};

export default HealthService;
