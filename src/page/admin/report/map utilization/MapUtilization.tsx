import { useFetchReports } from "../../../../hooks/Reports";
import style from "./style.module.scss";
import { BlueButton } from "../../../../components/button/BlueButton";
import { useReactToPrint } from "react-to-print";
import { useContext, useRef, useState } from "react";
import Table from "./Table";
import { UserProvider } from "../../../../context/UserProvider";

const MapUtilization = () => {
   const { cookies } = useContext(UserProvider);
   const medecines = useFetchReports();
   const componentRef = useRef<HTMLDivElement>(null);
   const handlePrint = useReactToPrint({
      content: () => componentRef.current,
   });

   const [information, setInformation] = useState({
      name: "",
      province: "",
      date_monitoring: "",
      date_accomplished: "",
      region: "",
      municipality: "",
   });
   const {
      name,
      province,
      region,
      municipality,
      date_accomplished,
      date_monitoring,
   } = information;
   const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInformation((prev) => ({ ...prev, [name]: value }));
   };
   return (
      <>
         <div className="flex flex-col gap-5">
            {medecines === undefined ? (
               <h1 className="text-gray w-full text-center">Loading...</h1>
            ) : medecines === null ? (
               <h1 className="text-gray w-full text-center">
                  Somethin went wrong...
               </h1>
            ) : (
               <>
                  <div ref={componentRef} className={style.container}>
                     <div className="flex relative flex-row items-center w-full justify-center">
                        <img
                           className="absolute left-0 top-0"
                           src="/image/DOH.png"
                           alt="DOH"
                           style={{
                              width: "100px",
                              height: "100px",
                           }}
                        />
                        <div className="flex flex-col gap-2">
                           <h4 className="text-center">
                              Republic of the Philippines
                           </h4>
                           <h3 className="text-center">Department of Health</h3>
                           <h1 className="text-center font-bold text-xl">
                              OFFICE OF THE SECRETARY
                           </h1>
                        </div>
                     </div>
                     <div className="flex flex-col items-center mt-2">
                        <h4 className="text-center font-bold">
                           HEALTH FACILITY MONTHLY UTILIZATION/ STOCK INVENTORY
                           REPORT FORM
                        </h4>
                        <span>
                           for Public Health Pharmaceuticals Inventory Notes
                        </span>
                     </div>
                     <div
                        className={`flex flex-nowrap gap-3 flex-wrap mt-3 ${style.rhu_form} `}
                     >
                        <div className={`w-[40%]`}>
                           <div>
                              <span>Name of Health Facility:</span>
                              <input
                                 type="text"
                                 className="border p-1"
                                 name="name"
                                 value={name}
                                 onChange={OnChange}
                              />
                           </div>
                           <div>
                              <span>Municipality:</span>
                              <input
                                 type="text"
                                 className="border p-1"
                                 name="municipality"
                                 value={municipality}
                                 onChange={OnChange}
                              />
                           </div>
                        </div>
                        <div className="w-[30%]">
                           <div>
                              <span>Province:</span>
                              <input
                                 type="text"
                                 className="border p-1"
                                 value={province}
                                 name="province"
                                 onChange={OnChange}
                              />
                           </div>
                           <div>
                              <span>Region:</span>
                              <input
                                 type="text"
                                 className="border p-1"
                                 name="region"
                                 value={region}
                                 onChange={OnChange}
                              />
                           </div>
                        </div>
                        <div className="w-[30%]">
                           <div>
                              <span>Date of Monitoring:</span>
                              <input
                                 type="date"
                                 className="border p-1"
                                 name="date_monitoring"
                                 value={date_monitoring}
                                 onChange={OnChange}
                              />
                           </div>
                           <div>
                              <span>Date Accomplished:</span>
                              <input
                                 type="date"
                                 className="border p-1"
                                 name="date_accomplished"
                                 value={date_accomplished}
                                 onChange={OnChange}
                              />
                           </div>
                        </div>
                     </div>

                     <div className="flex flex-row items-center mt-3">
                        <BlueButton
                           className="ml-auto py-1"
                           onClick={handlePrint}
                        >
                           Print Report
                        </BlueButton>
                     </div>
                     {medecines.map((item) => (
                        <Table item={item} />
                     ))}
                     <div className={`mt-4 ${style.report_footer}`}>
                        <div>
                           <small>Prepared by:</small>
                           <h2 className="text-center font-bold mt-4 text-sm"></h2>
                           <hr className="border border-black" />
                           <h3 className="text-center text-xs"></h3>
                        </div>
                        <div>
                           <small>Noted by:</small>
                           <h2 className="text-center text-sm font-bold mt-4"></h2>
                           <hr className="border border-black" />
                           <h3 className="text-center text-xs"></h3>
                        </div>
                     </div>
                  </div>
               </>
            )}
         </div>
      </>
   );
};

export default MapUtilization;
