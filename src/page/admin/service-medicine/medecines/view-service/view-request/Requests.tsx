import { useParams } from "react-router-dom";
import Table from "../../../../../../components/table/Table";
import { CircularProgress, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { BlueButton } from "../../../../../../components/button/BlueButton";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../firebase/Base";
import { RedButton } from "../../../../../../components/button/RedButton";
import Swal from "sweetalert2";
import { useFetchRequestMedecine } from "../../../../../../hooks/Request";
import { AiOutlineSearch } from "react-icons/ai";
import { CreateRapidApi } from "../../../../../../api/SMS/SendSMS";

const ENV = import.meta.env;

const Request = () => {
   const { id } = useParams();
   const medecine = useFetchRequestMedecine({ id: id });
   const [currentPage, setCurrentPage] = useState(1);
   const [sliceMedecines, setSliceMedecines] = useState<
      RequestMedecines[] | null
   >();
   const [search, setSearch] = useState("");
   const [refresh, setRefresh] = useState(false);
   const [pages, setPages] = useState(0);

   useEffect(() => {
      const SlicePagination = () => {
         if (medecine === null) return setSliceMedecines(null);
         if (medecine === undefined) return;

         const filterData = medecine.filter((item) =>
            item.patient_name
               .trim()
               .toLocaleLowerCase()
               .includes(search.toLocaleLowerCase().trim())
         );
         const pages = Math.ceil(filterData.length / 10);
         setPages(pages);

         const lastPostIndex = currentPage * 10;
         const firstPostIndex = lastPostIndex - 10;

         const currentPost = filterData?.slice(firstPostIndex, lastPostIndex);
         setSliceMedecines(currentPost);
      };

      SlicePagination();
   }, [currentPage, medecine, refresh]);

   const HandleRefresh = () => {
      setCurrentPage(0);
      setRefresh((prev) => !prev);
   };

   const OnChangeStatus = async (request: RequestMedecines, status: string) => {
      if (!id) return;

      await updateDoc(doc(db, "medecine_request", request.id), { status })
         .then(async () => {
            await CreateRapidApi({
               endPoint: "sms/send",
               token: ENV.VITE_TOKEN_SINCH,
               data: {
                  messages: [
                     {
                        from: "RHU",
                        body: `Your Request ${request.medecine_name} in RHU Bocaue has been ${status}`,
                        to: request.patient_no,
                     },
                  ],
               },
            });
         })
         .catch((err) => {
            Swal.fire({
               icon: "error",
               title: err,
            });
         });
   };

   return (
      <>
         <div className="flex flex-row justify-between items-center mt-10">
            <h1 className="text-blue text-2xl ">Patient's Request</h1>
            <div className="flex flex-row items-center w-[40%]">
               <button
                  className="text-white bg-blue text-xl px-2 py-[6px] rounded-l border border-blue"
                  onClick={HandleRefresh}
               >
                  <AiOutlineSearch />
               </button>
               <input
                  type="text"
                  placeholder="Search...."
                  className="border border-blue px-2 py-1 rounded-r w-[90%]"
                  style={{ outline: "none" }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                     if (e.code === "Enter") {
                        HandleRefresh();
                     }
                  }}
               />
            </div>
         </div>
         <Table th={["Patient", "Medecine", "Quantity", "Action"]}>
            {sliceMedecines === undefined ? (
               <tr>
                  <td className="text-center" colSpan={4}>
                     <div className="flex flex-col justify-center items-center">
                        <CircularProgress />
                        <span className="text-sm">Please wait...</span>
                     </div>
                  </td>
               </tr>
            ) : sliceMedecines === null ? (
               <tr>
                  <td className="text-sm" colSpan={4}>
                     Error Get Request List!!
                  </td>
               </tr>
            ) : sliceMedecines.length === 0 ? (
               <tr>
                  <td className="text-sm" colSpan={4}>
                     No Request found
                  </td>
               </tr>
            ) : (
               sliceMedecines.map((item) => (
                  <tr key={item.id}>
                     <td>{item.patient_name}</td>
                     <td>{item.medecine_name}</td>
                     <td>{item.quantity}</td>
                     <td className="flex flex-col gap-2 justify-center items-center">
                        <BlueButton
                           disabled={item.status === "approve"}
                           onClick={() => OnChangeStatus(item, "approve")}
                        >
                           Approve
                        </BlueButton>
                        <RedButton
                           onClick={() => OnChangeStatus(item, "decline")}
                        >
                           Decline
                        </RedButton>
                     </td>
                  </tr>
               ))
            )}
         </Table>

         {medecine && (
            <Pagination
               className="mt-2"
               page={currentPage}
               count={pages}
               variant="outlined"
               shape="rounded"
               color="primary"
               onChange={(_e, page) => setCurrentPage(page)}
            />
         )}
      </>
   );
};

export default Request;
