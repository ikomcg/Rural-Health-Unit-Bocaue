import React from "react";
import style from "./Button.module.scss";

const CloseMenu = (
   props: Omit<React.ComponentProps<"button">, "className">
) => {
   const { disabled, ...cleanProps } = props;
   return (
      <button
         {...cleanProps}
         className={`${
            disabled ? style.menu_btn_in_actv : style.menu_btn_actv
         } ${style.btn_menu}`}
      >
         <hr />
         <hr />
         <hr />
      </button>
   );
};

export default CloseMenu;
