import { useParams } from "react-router-dom";
import Table from "../../../../../../components/table/Table";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import Pagination from "../../../../../../components/pagination/Pagination";
import { BlueButton } from "../../../../../../components/button/BlueButton";
import AddRequest from "./add/Add";
import useFetchMyRequest from "../../../../../../hooks/MyRequest";
import { UserProvider } from "../../../../../../context/UserProvider";
const Request = () => {
   const { id } = useParams();
   const { cookies } = useContext(UserProvider);
   const doctors = useFetchMyRequest({ id: id, user_id: cookies?.id });
   const [currentPage, setCurrentPage] = useState(0);
   const [sliceDoctors, setSliceDoctors] = useState<RequestService[] | null>();
   const [isOpen, setIsOpen] = useState(false);
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

   return (
      <>
         <div className="flex flex-row items-center mt-10">
            <h1 className="text-blue text-2xl">My Request</h1>
            <BlueButton className="ml-auto" onClick={() => setIsOpen(true)}>
               Add Request
            </BlueButton>
         </div>
         <Table th={["Date Schedule", "Status"]}>
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
               limit={5}
               count={doctors.length}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
               className="mt-3"
            />
         )}

         {isOpen && <AddRequest isPost={isOpen} setIsPost={setIsOpen} />}
      </>
   );
};

export default Request;
