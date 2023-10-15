import React from "react";
import style from "./style.module.scss";

const Container = (props: React.ComponentProps<"div">) => {
   return (
      <div {...props} className={`${style.container} ${props.className ?? ""}`}>
         {props.children}
      </div>
   );
};

export default Container;
