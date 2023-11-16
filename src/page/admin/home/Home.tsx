import React from "react";
import style from "./style.module.scss";
import Chart from "react-apexcharts";
import useFetchUsers from "../../../hooks/Users";
import { BARANGAYS } from "../../register/PersonalInformation";

type CardType = {
   count: number;
   name: string;
};
const Card: React.FC<CardType> = ({ count, name }) => {
   return (
      <div className={style.card}>
         <div>
            <h2>{count}</h2>
            <h3>{name}</h3>
         </div>
      </div>
   );
};

// interface CountedData {
//    count: number;
//    created_at: string;
// }

const Home = () => {
   const users = useFetchUsers({
      role: ["patient", "admin", "health-worker", "doctor"],
   });
   // const [hWCount, setHWCount] = useState<
   //    { count: number; created_at: string }[] | null
   // >();
   // const [patientCount, setPatientCount] = useState<
   //    { count: number; created_at: string }[] | null
   // >();
   // const [userCount, setUserCount] = useState<
   //    { count: number; created_at: string }[] | null
   // >();
   const filterPatient = users?.filter((item) => item.role.includes("patient"));
   const healthWorkers = users?.filter(
      (item) =>
         item.role.includes("health-worker") || item.role.includes("doctor")
   );

   // const dataCountPatient = filterPatient.

   // console.log(userCount);
   return (
      <>
         <div className="flex flex-row my-10">
            <Card count={filterPatient?.length ?? 0} name="Total Patient" />
            <Card count={users?.length ?? 0} name="Users" />
            <Card count={healthWorkers?.length ?? 0} name="Health Workers" />
         </div>
         <Chart
            width="97%"
            height={500}
            type="bar"
            series={[
               {
                  name: "Patient",
                  data: [30, 40, 50],
               },
               {
                  name: "Health Workers",
                  data: [30, 40, 50],
               },
               {
                  name: "User",
                  data: [30, 40, 50],
               },
            ]}
            options={{
               dataLabels: {
                  enabled: false,
               },
               xaxis: {
                  type: "category",
                  categories: [...BARANGAYS],
               },
            }}
         />
      </>
   );
};

export default Home;
