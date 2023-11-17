import style from "./style.module.scss";

const FamilyPlanning = () => {
   return (
      <>
         <div
            className="mt-3"
            style={{
               overflowX: "scroll",
            }}
         >
            <table className={style.table}>
               <thead>
                  <th>COMMODITY</th>
                  <th>
                     Ending balance of the{" "}
                     <span className="text-red-500">PREVIOUS</span> Month (B)
                  </th>
                  <th>RECEIVED (C)</th>
                  <th>
                     <div className="flex flex-col">
                        <b>ADJUSTMENTS</b>
                        <div className="flex flex-row">
                           <span className="w-1/2">
                              Additional commodities (D) <br /> (+)
                           </span>
                           <span className="w-1/2">
                              Expired (E)
                              <br />
                              (-)
                           </span>
                        </div>
                     </div>
                  </th>
                  <th>
                     Total Available (F) <br /> (B+C+D)-E
                  </th>
                  <th className="text-red-500">No. of Patients</th>
                  <th>Total Dispensed</th>
                  <th>Ending balance of the PRESENT MONTH (F-H)</th>
                  <th>REMARKS</th>
               </thead>
               <tbody>
                  <tr>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                  </tr>
               </tbody>
            </table>
         </div>
      </>
   );
};

export default FamilyPlanning;
