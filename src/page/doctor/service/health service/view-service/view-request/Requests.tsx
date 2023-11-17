import { useParams } from "react-router-dom";
import Table from "../../../../../../components/table/Table";
import { CircularProgress, Pagination } from "@mui/material";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import AddRequest from "./add/Add";
import { UserProvider } from "../../../../../../context/UserProvider";
import useFetchDoctorSchedulesRequest from "../../../../../../hooks/DoctorSchedule";
const Request = () => {
   const { id } = useParams();
   const { cookies } = useContext(UserProvider);
   const doctors = useFetchDoctorSchedulesRequest({
      id: id,
      user_id: cookies?.id,
   });
   const [currentPage, setCurrentPage] = useState(1);
   const [sliceDoctors, setSliceDoctors] = useState<RequestService[] | null>();
   const [isOpen, setIsOpen] = useState(false);
   const [pages, setPages] = useState(0);
   useEffect(() => {
      const SlicePagination = () => {
         if (doctors === null) return setSliceDoctors(null);
         if (doctors === undefined) return;

         setPages(Math.ceil(doctors.length / 10));

         const lastPostIndex = currentPage * 5;
         const firstPostIndex = lastPostIndex - 5;

         const currentPost = doctors.slice(firstPostIndex, lastPostIndex);
         setSliceDoctors(currentPost);
      };

      SlicePagination();
   }, [currentPage, doctors]);

   return (
      <>
         <div className="flex flex-row items-center mt-10">
            <h1 className="text-blue text-2xl">My Request</h1>
         </div>
         <Table th={["Patient", "Date Schedule", "Status"]}>
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
                     <td>{item.patient?.full_name}</td>
                     <td>
                        {moment(item.request_date.toISOString())
                           .utcOffset(8)
                           .format("LLL")}
                     </td>
                     <td>
                        <span className="bg-[gray] text-sm text-slate-100 px-2 py-1 rounded">
                           {item.status.toLocaleUpperCase()}
                        </span>
                     </td>
                  </tr>
               ))
            )}
         </Table>

         {doctors && (
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

         {isOpen && <AddRequest isPost={isOpen} setIsPost={setIsOpen} />}
      </>
   );
};

export default Request;
