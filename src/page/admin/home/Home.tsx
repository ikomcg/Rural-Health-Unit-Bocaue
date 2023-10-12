import React, { useContext } from "react";
import { UserProvider } from "../../../context/UserProvider";
import style from "./style.module.scss";
import Chart from "react-apexcharts";
import Container from "../../../components/container/Container";

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
   const { cookies } = useContext(UserProvider);
   const generateDayWiseTimeSeries = (
      baseval: number,
      count: number,
      yrange: { min: number; max: number }
   ) => {
      const series = [];
      for (let i = 0; i <= count; i++) {
         const x = baseval;
         const y =
            Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
            yrange.min;
         series.push([x, y]);
         baseval += 86400000; // 1 day in milliseconds
      }
      return series;
   };

   return (
      <>
         <div className="bg-blue p-3 text-2xl text-white mx-auto mt-2 rounded">
            Welcome {cookies?.first_name} {cookies?.middle_name}{" "}
            {cookies?.last_name}!
         </div>
         <Container>
            <div className="flex flex-row my-10">
               <Card count={150} name="Total Patient" />
               <Card count={25} name="Users" />
               <Card count={50} name="Covid Cases" />
            </div>
            <Chart
               width="99%"
               height={500}
               type="area"
               series={[
                  {
                     name: "Patien",
                     data: generateDayWiseTimeSeries(
                        new Date("1 Oct 2023 GMT").getTime(),
                        20,
                        {
                           min: 10,
                           max: 60,
                        }
                     ),
                  },
                  {
                     name: "Users",
                     data: generateDayWiseTimeSeries(
                        new Date("1 Oct 2023 GMT").getTime(),
                        20,
                        {
                           min: 10,
                           max: 20,
                        }
                     ),
                  },
                  {
                     name: "Covid Cases",
                     data: generateDayWiseTimeSeries(
                        new Date("1 Oct 2023 GMT").getTime(),
                        20,
                        {
                           min: 10,
                           max: 15,
                        }
                     ),
                  },
               ]}
               options={{
                  dataLabels: {
                     enabled: false,
                  },
                  xaxis: {
                     type: "datetime",
                  },
                  colors: ["#008FFB", "#00E396", "#CED4DC"],
                  tooltip: {
                     x: {
                        format: "dd/MM/yy HH:mm",
                     },
                  },
                  legend: {
                     position: "top",
                     horizontalAlign: "left",
                  },
                  stroke: {
                     curve: "smooth",
                  },
                  fill: {
                     type: "gradient",
                     gradient: {
                        opacityFrom: 0.6,
                        opacityTo: 0.8,
                     },
                  },
                  chart: {
                     type: "area",
                     height: 350,
                     stacked: true,
                  },
               }}
            />
         </Container>
      </>
   );
};

export default Home;