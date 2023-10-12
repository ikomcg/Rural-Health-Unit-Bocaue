import React from "react";
import style from "./style.module.scss";
type CardType = {
   title: string;
   bg: string;
} & React.ComponentProps<"div">;
const Card: React.FC<CardType> = ({ title, bg, ...props }) => {
   return (
      <div className={`${style.container}`} {...props}>
         <div className={`bg-[url('${bg}')] `}>
            <h1>{title}</h1>
         </div>
      </div>
   );
};

export default Card;
