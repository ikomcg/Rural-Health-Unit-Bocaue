import React from "react";
import btn_style from "./Button.module.scss";

type RedButtonType = object & React.ComponentProps<"button">;

export const RedButton = (props: RedButtonType) => {
   const { disabled, children, className, ...cleanProps } = props;
   return (
      <button
         {...cleanProps}
         disabled={disabled}
         className={` ${
            !disabled
               ? `${btn_style.red_btn} ${btn_style.action_btn}`
               : "bg-[gray]"
         } ${className ?? ""} ${btn_style.btn} border px-3 `}
      >
         {children}
      </button>
   );
};
