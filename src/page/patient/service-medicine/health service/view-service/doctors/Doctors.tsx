import { useParams } from "react-router-dom";
import Table from "../../../../../../components/table/Table";
import useFetchSchedulesService from "../../../../../../hooks/Schedule";
import { CircularProgress, Pagination } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
const Doctors = () => {
   const { id } = useParams();
   const doctors = useFetchSchedulesService({ id: id });

   const [currentPage, setCurrentPage] = useState(1);
   const [sliceDoctors, setSliceDoctors] = useState<ScheduleService[] | null>();
   const [search, setSearch] = useState("");
   const [refresh, setRefresh] = useState(false);
   const [pages, setPages] = useState(0);

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
         const pages = Math.ceil(filterData.length / 10);
         setPages(pages);

         const lastPostIndex = currentPage * 10;
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
         <Table th={["Health Worker Name", "Available From", "Available To"]}>
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
      </>
   );
};

export default Doctors;
