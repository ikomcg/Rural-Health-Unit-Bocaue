import Container from "../../../components/container/Container";
import style from "./style.module.scss";
import MapUtilization from "./map utilization/MapUtilization";
import { useState } from "react";
import FamilyPlanning from "./family planning/FamilyPlanning";
type ButtonType = {
   active: boolean;
} & React.ComponentProps<"button">;

const Button: React.FC<ButtonType> = ({ active, ...props }) => {
   return (
      <button
         {...props}
         className={`${style.button} ${active ? style.active : style.inactive}`}
      >
         {props.children}
      </button>
   );
};

const Reports = () => {
   const [activetab, setActiveTab] = useState("family-planning");
   const OnNavigateHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
      const { name } = e.currentTarget;

      setActiveTab(name);
   };

   return (
      <Container className="overflow-x-hidden w-full">
         <div className="flex flex-row gap-3">
            <Button
               active={!activetab.includes("utilization")}
               name="family-planning"
               onClick={OnNavigateHandle}
            >
               Family Planning
            </Button>
            <Button
               active={activetab.includes("utilization")}
               name="utilization"
               onClick={OnNavigateHandle}
            >
               Map Utilization
            </Button>
         </div>
         {activetab === "family-planning" ? (
            <FamilyPlanning />
         ) : (
            <MapUtilization />
         )}
      </Container>
   );
};

export default Reports;
