import React from "react";
import style from "./style.module.scss";

type TableType = {
   th: string[];
} & React.ComponentProps<"table">;

const Table = ({ th, className, ...props }: TableType) => {
   return (
      <table className={`${style.table} ${className}`}>
         <thead>
            <tr>
               {th.map((item, i) => (
                  <th key={item+i}>{item}</th>
               ))}
            </tr>
         </thead>
         <tbody>{props.children}</tbody>
      </table>
   );
};

export default Table;
