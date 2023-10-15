import { useParams } from "react-router-dom";
import Table from "../../../../../../components/table/Table";
import useFetchSchedulesService from "../../../../../../hooks/Schedule";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../../firebase/Base";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Pagination from "../../../../../../components/pagination/Pagination";
const Doctors = () => {
   const { id } = useParams();
   const doctors = useFetchSchedulesService({ id: id });

   const OnDeleteSchedule = async (schedule_id: string) => {
      if (!id) return;
      return await deleteDoc(doc(db, "service", id, "schedules", schedule_id))
         .then(() => {
            return Swal.fire({
               icon: "success",
               text: "Deleted Schedule Successfuly",
            });
         })
         .catch(() => {
            return Swal.fire({
               icon: "error",
               text: "Failed to Deleted Schedule",
            });
         });
   };

   const [currentPage, setCurrentPage] = useState(0);
   const [pages, setPages] = useState(0);
   const [sliceDoctors, setSliceDoctors] = useState<ScheduleService[] | null>();
   const [search, setSearch] = useState("");
   const [refresh, setRefresh] = useState(false);
   useEffect(() => {
      const SlicePagination = () => {
         if (doctors === null) return setSliceDoctors(null);
         if (doctors === undefined) return;

         const filterData = doctors.filter((item) =>
            item.name
               .trim()
               .toLocaleLowerCase()
               .includes(search.toLocaleLowerCase().trim())
         );
         setPages(filterData.length);
         const page = currentPage + 1;
         const lastPostIndex = page * 10;
         const firstPostIndex = lastPostIndex - 10;

         const currentPost = filterData?.slice(firstPostIndex, lastPostIndex);
         setSliceDoctors(currentPost);
      };

      SlicePagination();
   }, [currentPage, doctors, refresh]);

   const HandleRefresh = () => {
      setCurrentPage(0);
      setRefresh((prev) => !prev);
   };

   return (
      <>
         <div className="flex flex-row justify-end mt-2">
            <button
               className="text-white bg-blue text-xl px-2 py-[4px] rounded-l border border-blue"
               onClick={HandleRefresh}
            >
               <AiOutlineSearch />
            </button>
            <input
               type="text"
               placeholder="Search...."
               className="border border-blue px-2 py-1 rounded-r w-1/3"
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
         <Table
            th={[
               "Health Worker Name",
               "Available From",
               "Available To",
               "Action",
            ]}
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
                     Error Get Schedules!!
                  </td>
               </tr>
            ) : sliceDoctors.length === 0 ? (
               <tr>
                  <td className="text-sm" colSpan={4}>
                     No Schedules found
                  </td>
               </tr>
            ) : (
               sliceDoctors.map((item) => (
                  <tr key={item.id}>
                     <td>{item.name}</td>
                     <td>
                        {moment(item.available_from.toISOString())
                           .utcOffset(8)
                           .format("LLL")}
                     </td>
                     <td>
                        {moment(item.available_to.toISOString())
                           .utcOffset(8)
                           .format("LLL")}
                     </td>
                     <td className="flex flex-row gap-2 justify-center">
                        <button
                           className="bg-red-500 px-1 py-1 rounded text-xs"
                           onClick={() => OnDeleteSchedule(item.id)}
                        >
                           <FaTrash className="text-white" />
                        </button>
                        <button className="bg-blue px-1 py-1 rounded text-xs">
                           <AiFillEdit className="text-white" />
                        </button>
                     </td>
                  </tr>
               ))
            )}
         </Table>

         {doctors && (
            <Pagination
               limit={10}
               count={pages}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
               className="mt-3"
            />
         )}
      </>
   );
};

export default Doctors;
