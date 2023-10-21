import React, { ComponentProps } from "react";
import style from "./style.module.scss";
import { BsClipboard2Plus } from "react-icons/bs";
type CardType = {
   title: string;
   bg: string;
} & React.ComponentProps<"div">;
const Card: React.FC<CardType> = ({ title, bg, ...props }) => {
   return (
      <div className={`${style.container}`} {...props}>
         <div className="relative">
            <img src={bg} alt="" />
            <h1>{title}</h1>
         </div>
      </div>
   );
};

export default Card;

export const AddCard = (props : ComponentProps<"div">) => {

   return (
      <div className={`${style['add-card-container']}`} {...props}>
            <BsClipboard2Plus />
      </div>
   );
};
