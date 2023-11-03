import { useParams } from "react-router-dom";
import Table from "../../../../../../components/table/Table";
import { CircularProgress, Pagination } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import useFetchRequest from "../../../../../../hooks/Request";
import { BlueButton } from "../../../../../../components/button/BlueButton";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../firebase/Base";
import { RedButton } from "../../../../../../components/button/RedButton";
import { AiOutlineSearch } from "react-icons/ai";
import CSwal from "../../../../../../components/swal/Swal";
import { CreateRapidApi } from "../../../../../../api/SMS/SendSMS";

const Request = () => {
   const { id } = useParams();
   const requests = useFetchRequest({ id: id });
   const [currentPage, setCurrentPage] = useState(1);
   const [sliceRequest, setSliceRequest] = useState<RequestService[] | null>();
   const [search, setSearch] = useState("");
   const [refresh, setRefresh] = useState(false);
   const [pages, setPages] = useState(0);
   requests;
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
         const pages = Math.ceil(filterData.length / 10);
         setPages(pages);

         const lastPostIndex = currentPage * 10;
         const firstPostIndex = lastPostIndex - 10;

         const currentPost = filterData?.slice(firstPostIndex, lastPostIndex);
         setSliceRequest(currentPost);
      };

      SlicePagination();
   }, [currentPage, requests, refresh]);

   const HandleRefresh = () => {
      setCurrentPage(1);
      setRefresh((prev) => !prev);
   };

   const OnChangeStatus = async (request: RequestService, status: string) => {
      if (!id) return;

      await updateDoc(doc(db, "schedules", request.id), { status })
         .then(async () => {
            await CreateRapidApi({
               endPoint: "sms/send",
               token: "bWFyaWJlbGdlcnNhbGlhQGdtYWlsLmNvbTpGNkQwMTQ4OS01MzhELURBMTctRUE5Qi1GOTJCN0NDQzY3QUQ=",
               data: {
                  messages: [
                     {
                        from: "RHU",
                        body: `Your Schedule ${moment(
                           request.request_date.toISOString()
                        )
                           .utcOffset(8)
                           .format("LLL")} in RHU Bocaue has been ${status}`,
                        to: request.patient_no,
                     },
                  ],
               },
            });
         })
         .catch((err) => {
            CSwal({
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
                           onClick={() => OnChangeStatus(item, "approve")}
                        >
                           Approve
                        </BlueButton>
                        <RedButton
                           disabled={item.status === "decline"}
                           onClick={() => OnChangeStatus(item, "decline")}
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
