import { useParams } from "react-router-dom";
import Table from "../../../../../../components/table/Table";
import { CircularProgress, Pagination } from "@mui/material";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { BlueButton } from "../../../../../../components/button/BlueButton";
import AddRequest from "./add/Add";
import useFetchMyRequest from "../../../../../../hooks/MyRequest";
import { UserProvider } from "../../../../../../context/UserProvider";
import style from "./style.module.scss";
import CSwal from "../../../../../../components/swal/Swal";

const Request = () => {
   const { id } = useParams();
   const { cookies } = useContext(UserProvider);
   const doctors = useFetchMyRequest({ id: id, user_id: cookies?.id });
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
            <BlueButton
               className="ml-auto py-1"
               onClick={() => {
                  if (!cookies?.is_verify) {
                     CSwal({
                        icon: "info",
                        title: "Account not Verified",
                        text: "Contact Rural Health Unit to verify your account",
                     });
                     return;
                  }
                  setIsOpen(true);
               }}
               disabled={cookies?.account_status !== "active"}
            >
               Add Request
            </BlueButton>
         </div>
         <Table
            th={["Date Schedule", "Reason", "Doctor Assigned", "Status"]}
            className={style.table_request}
         >
            {sliceDoctors === undefined ? (
               <tr>
                  <td className="text-center" colSpan={4}>
                     <div className="flex flex-col justify-center items-center">
                        <CircularProgress />
                        <span className="text-sm">Please wait...</span>
                     </div>
                  </td>
               </tr>
            ) : sliceDoctors === null ? (
               <tr>
                  <td className="text-sm" colSpan={4}>
                     Error Get Request List!!
                  </td>
               </tr>
            ) : sliceDoctors.length === 0 ? (
               <tr>
                  <td className="text-sm" colSpan={4}>
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
                     <td>{item?.reason}</td>
                     <td>{item?.doctor?.full_name}</td>
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
