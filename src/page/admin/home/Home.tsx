import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import Chart from "react-apexcharts";
import useFetchUsers from "../../../hooks/Users";

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

interface CountedData {
   count: number;
   created_at: string;
}

const Home = () => {
   const users = useFetchUsers({
      role: ["patient", "admin", "health-worker", "doctor"],
   });
   const [hWCount, setHWCount] = useState<
      { count: number; created_at: string }[] | null
   >();
   const [patientCount, setPatientCount] = useState<
      { count: number; created_at: string }[] | null
   >();
   const [userCount, setUserCount] = useState<
      { count: number; created_at: string }[] | null
   >();
   const filterPatient = users?.filter((item) => item.role.includes("patient"));
   const healthWorkers = users?.filter(
      (item) =>
         item.role.includes("health-worker") || item.role.includes("doctor")
   );
   useEffect(() => {
      if (!filterPatient || !users || !healthWorkers) return;
      const sortPatient = filterPatient.sort((a, b) => {
         const dateA = new Date(a.created_at);
         const dateB = new Date(b.created_at);

         return dateA.getMonth() - dateB.getMonth();
      });
      const sortUsers = users.sort((a, b) => {
         const dateA = new Date(a.created_at);
         const dateB = new Date(b.created_at);

         return dateA.getMonth() - dateB.getMonth();
      });
      const sortHW = healthWorkers.sort((a, b) => {
         const dateA = new Date(a.created_at);
         const dateB = new Date(b.created_at);

         return dateA.getMonth() - dateB.getMonth();
      });

      const countedDataPatient: CountedData[] = sortPatient.reduce(
         (accumulator: CountedData[], current: UserType) => {
            const existingEntry = accumulator.find((entry) => {
               const entryDate = new Date(entry.created_at);
               const currentDate = new Date(current.created_at);
               return entryDate.getMonth() === currentDate.getMonth();
            });

            if (existingEntry) {
               existingEntry.count += 1;
            } else {
               accumulator.push({ count: 1, created_at: current.created_at });
            }

            return accumulator;
         },
         []
      );

      const countedDataUser: CountedData[] = sortUsers.reduce(
         (accumulator: CountedData[], current: UserType) => {
            const existingEntry = accumulator.find((entry) => {
               const entryDate = new Date(entry.created_at);
               const currentDate = new Date(current.created_at);
               return entryDate.getMonth() === currentDate.getMonth();
            });

            if (existingEntry) {
               existingEntry.count += 1;
            } else {
               accumulator.push({ count: 1, created_at: current.created_at });
            }

            return accumulator;
         },
         []
      );

      const countedHW: CountedData[] = sortHW.reduce(
         (accumulator: CountedData[], current: UserType) => {
            const existingEntry = accumulator.find((entry) => {
               const entryDate = new Date(entry.created_at);
               const currentDate = new Date(current.created_at);
               return entryDate.getMonth() === currentDate.getMonth();
            });

            if (existingEntry) {
               existingEntry.count += 1;
            } else {
               accumulator.push({ count: 1, created_at: current.created_at });
            }

            return accumulator;
         },
         []
      );

      setPatientCount(countedDataPatient);
      setUserCount(countedDataUser);
      setHWCount(countedHW);
   }, [users]);

   console.log(userCount);
   return (
      <>
         <div className="flex flex-row my-10">
            <Card count={filterPatient?.length ?? 0} name="Total Patient" />
            <Card count={users?.length ?? 0} name="Users" />
            <Card count={hWCount?.length ?? 0} name="Health Workers" />
         </div>
         <Chart
            width="97%"
            height={500}
            type="area"
            series={[
               {
                  name: "Patient",
                  data: patientCount
                     ? [...patientCount.map((item) => item.count)]
                     : [],
               },
               {
                  name: "Users",
                  data: userCount
                     ? [...userCount.map((item) => item.count)]
                     : [],
               },
               {
                  name: "Health Workers",
                  data: hWCount ? [...hWCount.map((item) => item.count)] : [],
               },
            ]}
            options={{
               dataLabels: {
                  enabled: false,
               },
               xaxis: {
                  type: "category",
                  categories: userCount
                     ? [
                          ...userCount.map((item) =>
                             new Date(item.created_at).toLocaleString(
                                "default",
                                { month: "short" }
                             )
                          ),
                       ]
                     : [],
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
      </>
   );
};

export default Home;
