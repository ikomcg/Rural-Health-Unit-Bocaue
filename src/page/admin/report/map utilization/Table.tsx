import moment from "moment";
import style from './style.module.scss';

type TableType = {
    item: MedecinesReportsType;
 } & React.ComponentProps<"div">;
 const Table = ({ item, ...cleanProps }: TableType) => {
    return (
       <div {...cleanProps} className="mt-3">
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
                {item.medecines?.map((med) => (
                   <tr>
                      <td>{med.medicine?.name}</td>
                      <td>0</td>
                      <td>
                         {/* delivery */}
                         {med.category === "DELIVERY" ? (
                            <div className="flex flex-row">
                               <span className="w-1/3">{med.stock_in}</span>
                               <span className="w-1/3 h-full">
                                  {med.batch_lot_no}
                               </span>
                               <span className="w-1/3">
                                  {moment(med.medicine?.created_at)
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
                            <span className="w-1/2">
                               {med.category === "RECEIVED STOCK"
                                  ? med.stock_in
                                  : ""}
                            </span>
 
                            <span className="w-1/2">
                               {item.medicine_adjustment?.find(
                                  (medAD) =>
                                     medAD.medicine_id === med.medicine.id &&
                                     medAD.reason === "TRANSFER"
                               )?.stock_out ?? ""}
                            </span>
                         </div>
                      </td>
                      <td>
                         {item.medicines_request.find(
                            (item) => item.medicine_id === med.id
                         )?.quantity ?? ""}
                      </td>
                      <td>
                         {
                            item.medicines_request.filter(
                               (item) => item.medicine_id === med.id
                            ).length
                         }
                      </td>
                      <td>
                         {item.medicine_adjustment?.find(
                            (medAD) =>
                               medAD.medicine_id === med.medicine.id &&
                               medAD.reason === "EXPIRED"
                         )?.stock_out ?? ""}
                      </td>
                      <td>
                         {Number(
                            item.medicines_request.find(
                               (item) => item.medicine_id === med.id
                            )?.quantity ?? "0"
                         ) +
                            Number(med.stock_in) +
                            Number(
                               item.medicine_adjustment?.find(
                                  (medAD) =>
                                     medAD.medicine_id === med.medicine.id &&
                                     medAD.reason === "TRANSFER"
                               )?.stock_out ?? "0"
                            ) -
                            (Number(
                               item.medicines_request.find(
                                  (item) => item.medicine_id === med.id
                               )?.quantity ?? "0"
                            ) +
                               Number(
                                  item.medicine_adjustment?.find(
                                     (medAD) =>
                                        medAD.medicine_id === med.medicine.id &&
                                        medAD.reason === "EXPIRED"
                                  )?.stock_out ?? "0"
                               ) +
                               Number(
                                  item.medicine_adjustment?.find(
                                     (medAD) =>
                                        medAD.medicine_id === med.medicine.id &&
                                        medAD.reason === "EXPIRED"
                                  )?.stock_out ?? "0"
                               ))}
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    );
 };
 export default Table