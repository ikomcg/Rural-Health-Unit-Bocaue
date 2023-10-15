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
const Request = () => {
   const { id } = useParams();
   const doctors = useFetchRequest({ id: id });
   const [currentPage, setCurrentPage] = useState(0);
   const [sliceDoctors, setSliceDoctors] = useState<RequestService[] | null>();

   useEffect(() => {
      const SlicePagination = () => {
         if (doctors === null) return setSliceDoctors(null);

         const page = currentPage + 1;
         const lastPostIndex = page * 5;
         const firstPostIndex = lastPostIndex - 5;

         const currentPost = doctors?.slice(firstPostIndex, lastPostIndex);
         setSliceDoctors(currentPost);
      };

      SlicePagination();
   }, [currentPage, doctors]);

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
         <h1 className="text-blue text-2xl mt-10">Patient's Request</h1>
         <Table th={["Patient", "Date Schedule", "Action"]}>
            {sliceDoctors === undefined ? (
               <tr>
                  <td className="text-center" colSpan={3}>
                     <div className="flex flex-col justify-center items-center">
                        <CircularProgress />
                        <span className="text-sm">Please wait...</span>
                     </div>
                  </td>
               </tr>
            ) : sliceDoctors === null ? (
               <tr>
                  <td className="text-sm" colSpan={3}>
                     Error Get Request List!!
                  </td>
               </tr>
            ) : sliceDoctors.length === 0 ? (
               <tr>
                  <td className="text-sm" colSpan={3}>
                     No Request found
                  </td>
               </tr>
            ) : (
               sliceDoctors.map((item) => (
                  <tr key={item.id}>
                     <td>{item.patient_name}</td>
                     <td>
                        {moment(item.request_date.toISOString())
                           .utcOffset(8)
                           .format("LLL")}
                     </td>
                     <td className="flex flex-col gap-2 justify-center items-center">
                        <BlueButton
                           disabled={item.status === "accept"}
                           onClick={() => OnChangeStatus(item.id, "accept")}
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

         {doctors && (
            <Pagination
               limit={5}
               count={doctors.length}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
               className="mt-3"
            />
         )}
      </>
   );
};

export default Request;
