import style from "./UnderConstructionLogo.module.scss";
import { BsGearWide, BsGearWideConnected } from "react-icons/bs";

type UnderConstructionLogoType = {} & React.ComponentProps<"div">;

const UnderConstructionLogo = (props: UnderConstructionLogoType) => {
   const { children, className, ...cleanProps } = props;

   return (
      <div className={`${style.container} ${className}`} {...cleanProps}>
         <div className={style.icons}>
            <div className={style.left}>
               <BsGearWide />
            </div>
            <div className={style.center}>
               <BsGearWideConnected />
            </div>
            <div className={style.right}>
               <BsGearWide />
            </div>
         </div>
         <div className={style.message}>{children}</div>
      </div>
   );
};

export default UnderConstructionLogo;
