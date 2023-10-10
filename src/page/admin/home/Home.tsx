import React, { useContext } from "react";
import { UserProvider } from "../../../context/UserProvider";
import style from "./style.module.scss";
import Chart from "react-apexcharts";

const Home = () => {
   const { cookies } = useContext(UserProvider);

   return (
      <>
         <div className="bg-blue p-3 text-2xl text-white mx-auto mt-2 rounded">
            Welcome {cookies?.first_name} {cookies?.middle_name}{" "}
            {cookies?.last_name}!
         </div>
         <div className="flex flex-row my-10">
            <Card count={150} name="Total Patient" />
            <Card count={25} name="Users" />
            <Card count={50} name="Covid Case" />
         </div>
         <Chart
            width='99%'
            height={500}
            type="area"
            series={[
               {
                  name: "series1",
                  data: [31, 40, 28, 51, 42, 109, 100],
               },
               {
                  name: "series2",
                  data: [11, 32, 45, 32, 34, 52, 41],
               },
               {
                name: "series3",
                data: [10, 25, 40, 37, 38, 52, 35],
             },
            ]}
            options={{
               chart: {
                  height: 350,
                  type: "area",
               },
               dataLabels: {
                  enabled: false,
               },
               stroke: {
                  curve: "smooth",
               },
               xaxis: {
                  type: "datetime",
                  categories: [
                     "2018-09-19T00:00:00.000Z",
                     "2018-09-19T01:30:00.000Z",
                     "2018-09-19T02:30:00.000Z",
                     "2018-09-19T03:30:00.000Z",
                     "2018-09-19T04:30:00.000Z",
                     "2018-09-19T05:30:00.000Z",
                     "2018-09-19T06:30:00.000Z",
                  ],
               },
               tooltip: {
                  x: {
                     format: "dd/MM/yy HH:mm",
                  },
               },
            }}
         />
      </>
   );
};

export default Home;

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
