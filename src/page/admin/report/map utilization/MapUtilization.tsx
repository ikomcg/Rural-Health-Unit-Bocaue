import moment from "moment";
import { useFetchReports } from "../../../../hooks/Reports";
import style from "./style.module.scss";

const MapUtilization = () => {
   const medecines = useFetchReports();
   return (
      <div className="flex flex-col gap-5">
         {medecines === undefined ? (
            <h1 className="text-gray w-full text-center">Loading...</h1>
         ) : medecines === null ? (
            <h1 className="text-gray w-full text-center">
               Somethin went wrong...
            </h1>
         ) : (
            medecines.map((item) => <Table item={item} />)
         )}
      </div>
   );
};

export default MapUtilization;

type TableType = {
   item: MedecinesReportsType;
};
const Table = ({ item }: TableType) => {
   return (
      <div
         className="mt-3"
         style={{
            overflowX: "scroll",
         }}
      >
         <table className={style.table}>
            <thead>
               <th>{item.name}</th>
               <th>
                  Ending Inventory from the{" "}
                  <span className="text-red-500">PREVIOUS</span> Month <br />
                  (A)
               </th>
               <th className="">
                  <div className="flex flex-col" style={{ maxHeight: "100%" }}>
                     <b>Deliveries</b>
                     <div className="flex flex-row">
                        <span className="w-1/3 h-full">
                           Quantity <br /> (B)
                        </span>
                        <span className="w-1/3">Batch/lot no.</span>
                        <span className="w-1/3">Date of Delivery</span>
                     </div>
                  </div>
               </th>
               <th>
                  <div className="flex flex-col">
                     <b>Stocks Transfer</b>
                     <div className="flex flex-row">
                        <span className="w-1/2">
                           Received (C) <br />
                        </span>
                        <span className="w-1/2">
                           Transferred (D) <br />
                        </span>
                     </div>
                  </div>
               </th>
               <th>
                  Monthly Consumption <br /> (E)
               </th>
               <th className="text-red-500">No. of Patients</th>
               <th>Expired Stocks</th>
               <th>End of Month Stocks</th>
            </thead>
            <tbody>
               {item.medecines?.map((item) => (
                  <tr>
                     <td>{item.medicine?.name}</td>
                     <td>0</td>
                     <td>
                        {/* delivery */}
                        {item.category === "DELIVERY" ? (
                           <div className="flex flex-row">
                              <span className="w-1/3">{item.stock_in}</span>
                              <span className="w-1/3 h-full">
                                 {item.batch_lot_no}
                              </span>
                              <span className="w-1/3">
                                 {moment(item.medicine?.created_at)
                                    .utcOffset(8)
                                    .format("L")}
                              </span>
                           </div>
                        ) : (
                           <div className="flex flex-row">
                              <span className="w-1/3 h-full"></span>
                              <span className="w-1/3"></span>
                              <span className="w-1/3"></span>
                           </div>
                        )}
                     </td>
                     <td>
                        <div className="flex flex-row">
                           {item.category === "RECEIVED STOCK" ? (
                              <span className="w-1/2">{item.stock_in}</span>
                           ) : (
                              <span className="w-1/2"></span>
                           )}
                           {item.category === "ADJUSTMENT" ? (
                              <span className="w-1/2">{item.stock_in}</span>
                           ) : (
                              <span className="w-1/2"></span>
                           )}
                        </div>
                     </td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};
