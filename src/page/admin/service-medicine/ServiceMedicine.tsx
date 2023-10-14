import { Outlet, useNavigate } from "react-router-dom";
import Container from "../../../components/container/Container";
import style from "./style.module.scss";
import { BlueButton } from "../../../components/button/BlueButton";
import { BsPlus } from "react-icons/bs";
import NewService from "./health service/add/Add";
import { useState } from "react";
import NewMedecine from "./medecines/add/Add";

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

const ServiceMedicine = () => {
   const path = window.location.pathname;
   const navigate = useNavigate();
   const [isService, setIsService] = useState(false);
   const [isMedecine, setIsMedecine] = useState(false);

   const HandleClickService = () => {
      setIsService((prev) => !prev);
   };
   const HandleClickMedecine = () => {
      setIsMedecine((prev) => !prev);
   };

   const OnNavigateHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
      const { name } = e.currentTarget;

      navigate(name ?? "");
   };

   return (
      <Container>
         <div className="flex flex-row gap-3">
            <Button
               active={!path.includes("medicines")}
               name="health-services"
               onClick={OnNavigateHandle}
            >
               Health Services
            </Button>
            <Button
               active={path.includes("medicines")}
               name="medicines"
               onClick={OnNavigateHandle}
            >
               Medicines
            </Button>
            {path.includes("medicines") ? (
               <BlueButton
                  className="flex flex-row gap-1 items-center ml-auto"
                  onClick={HandleClickMedecine}
               >
                  <BsPlus className="text-lg" />
                  Add Medecine
               </BlueButton>
            ) : (
               <BlueButton
                  className="flex flex-row gap-1 items-center ml-auto"
                  onClick={HandleClickService}
               >
                  <BsPlus className="text-lg" />
                  Add Service
               </BlueButton>
            )}
         </div>
         {isService && (
            <NewService isPost={isService} setIsPost={setIsService} />
         )}
         {isMedecine && (
            <NewMedecine isPost={isMedecine} setIsPost={setIsMedecine} />
         )}
         <Outlet />
      </Container>
   );
};

export default ServiceMedicine;
