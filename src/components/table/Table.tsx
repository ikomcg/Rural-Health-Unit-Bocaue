import React from "react";
import style from "./style.module.scss";

type TableType = {
   th: string[];
} & React.ComponentProps<"table">;

const Table = ({ th, className, ...props }: TableType) => {
   return (
      <div className="overflow-x-auto">
         <table className={`${style.table} ${className}`}>
            <thead>
               <tr>
                  {th.map((item, i) => (
                     <th key={item + i}>{item}</th>
                  ))}
               </tr>
            </thead>
            <tbody>{props.children}</tbody>
         </table>
      </div>
   );
};

export default Table;
