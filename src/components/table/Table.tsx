import React from "react";
import style from "./style.module.scss";

type TableType = {
   th: string[];
} & React.ComponentProps<"table">;

const Table = ({ th, ...props }: TableType) => {
   return (
      <table className={`${style.table}`}>
         <thead>
            <tr>
               {th.map((item) => (
                  <th>{item}</th>
               ))}
            </tr>
         </thead>
         <tbody>{props.children}</tbody>
      </table>
   );
};

export default Table;
