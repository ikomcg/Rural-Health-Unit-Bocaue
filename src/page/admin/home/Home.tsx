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

const Home = () => {
   const users =
      useFetchUsers({
         role: ["patient", "admin", "health-worker", "doctor"],
      }) ?? [];

   const patientUsers =
      users
         ?.filter((item) => item.role.includes("patient"))
         .sort((a, b) => a.barangay.localeCompare(b.barangay)) ?? [];

   const healthWorkers =
      users
         ?.filter(
            (item) =>
               item.role.includes("health-worker") ||
               item.role.includes("doctor")
         )
         .sort((a, b) => a.barangay.localeCompare(b.barangay)) ?? [];

   const countPatient = Object.values(
      patientUsers.reduce((acc, user) => {
         acc[user.barangay] = (acc[user.barangay] || 0) + 1;
         return acc;
      }, {} as Record<string, number>)
   );

   const countHealthWorkers = Object.values(
      healthWorkers.reduce((acc, user) => {
         acc[user.barangay] = (acc[user.barangay] || 0) + 1;
         return acc;
      }, {} as Record<string, number>)
   );

   const countUsers = Object.values(
      users.reduce((acc, user) => {
         acc[user.barangay] = (acc[user.barangay] || 0) + 1;
         return acc;
      }, {} as Record<string, number>)
   );

   return (
      <>
         <div className="flex flex-row my-10">
            <Card count={patientUsers?.length ?? 0} name="Total Patient" />
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
                  data: countPatient ? [...countPatient] : [],
               },
               {
                  name: "Health Workers",
                  data: countHealthWorkers ? [...countHealthWorkers] : [],
               },
               {
                  name: "User",
                  data: countUsers ? [...countUsers] : [],
               },
            ]}
            options={{
               dataLabels: {
                  enabled: false,
               },
               yaxis: {},
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
