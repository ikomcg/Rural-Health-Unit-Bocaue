import { Outlet, useNavigate } from "react-router-dom";
import Container from "../../../components/container/Container";
import style from "./style.module.scss";
import { BlueButton } from "../../../components/button/BlueButton";
import { BsPlus } from "react-icons/bs";

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
               <BlueButton className="flex flex-row gap-1 items-center ml-auto">
                  <BsPlus className="text-lg" />
                  Add Medecine
               </BlueButton>
            ) : (
               <BlueButton className="flex flex-row gap-1 items-center ml-auto">
                  <BsPlus className="text-lg" />
                  Add Service
               </BlueButton>
            )}
         </div>
         <Outlet />
      </Container>
   );
};

export default ServiceMedicine;
