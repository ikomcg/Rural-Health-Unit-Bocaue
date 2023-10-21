import { useParams } from "react-router-dom";
import Table from "../../../../../../components/table/Table";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import Pagination from "../../../../../../components/pagination/Pagination";
import useFetchRequest from "../../../../../../hooks/Request";
import { BlueButton } from "../../../../../../components/button/BlueButton";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../firebase/Base";
import { RedButton } from "../../../../../../components/button/RedButton";
import Swal from "sweetalert2";
import { AiOutlineSearch } from "react-icons/ai";
const Request = () => {
   const { id } = useParams();
   const requests = useFetchRequest({ id: id });
   const [currentPage, setCurrentPage] = useState(0);
   const [sliceRequest, setSliceRequest] = useState<RequestService[] | null>();
   const [search, setSearch] = useState("");
   const [refresh, setRefresh] = useState(false);
   const [pages, setPages] = useState(0);

   useEffect(() => {
      const SlicePagination = () => {
         if (requests === null) return setSliceRequest(null);
         if (requests === undefined) return;

         const filterData = requests.filter((item) =>
            item.patient_name
               .trim()
               .toLocaleLowerCase()
               .includes(search.toLocaleLowerCase().trim())
         );
         setPages(filterData.length);
         const page = currentPage + 1;
         const lastPostIndex = page * 10;
         const firstPostIndex = lastPostIndex - 10;

         const currentPost = filterData?.slice(firstPostIndex, lastPostIndex);
         setSliceRequest(currentPost);
      };

      SlicePagination();
   }, [currentPage, requests, refresh]);

   const HandleRefresh = () => {
      setCurrentPage(0);
      setRefresh((prev) => !prev);
   };

   const OnChangeStatus = async (requestID: string, status: string) => {
      if (!id) return;

      await updateDoc(doc(db, "schedules", requestID), { status })
         .then(() => {})
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
                  className="text-white bg-blue text-xl px-2 py-[6.5px] rounded-l border border-blue"
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

         <Table th={["Patient", "Date Schedule", "Action"]}>
            {sliceRequest === undefined ? (
               <tr>
                  <td className="text-center" colSpan={3}>
                     <div className="flex flex-col justify-center items-center">
                        <CircularProgress />
                        <span className="text-sm">Please wait...</span>
                     </div>
                  </td>
               </tr>
            ) : sliceRequest === null ? (
               <tr>
                  <td className="text-sm" colSpan={3}>
                     Error Get Request List!!
                  </td>
               </tr>
            ) : sliceRequest.length === 0 ? (
               <tr>
                  <td className="text-sm" colSpan={3}>
                     No Request found
                  </td>
               </tr>
            ) : (
               sliceRequest.map((item) => (
                  <tr key={item.id}>
                     <td>{item.patient_name}</td>
                     <td>
                        {moment(item.request_date.toISOString())
                           .utcOffset(8)
                           .format("LLL")}
                     </td>
                     <td className="flex flex-col gap-2 justify-center items-center">
                        <BlueButton
                           disabled={item.status === "approve"}
                           onClick={() => OnChangeStatus(item.id, "approve")}
                        >
                           Accept
                        </BlueButton>
                        <RedButton
                           onClick={() => OnChangeStatus(item.id, "decline")}
                        >
                           Decline
                        </RedButton>
                     </td>
                  </tr>
               ))
            )}
         </Table>

         {requests && (
            <Pagination
               limit={5}
               count={pages}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
               className="mt-3"
            />
         )}
      </>
   );
};

export default Request;
