import { useEffect, useState } from "react";
import Container from "../../../components/container/Container";
import Pagination from "../../../components/pagination/Pagination";
import Table from "../../../components/table/Table";
import useFetchDoctors from "../../../hooks/Doctors";
import { CircularProgress } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";

const HealtWorkers = () => {
   const doctors = useFetchDoctors();
   const [currentPage, setCurrentPage] = useState(0);
   const [pages, setPages] = useState(0);
   const [sliceDoctors, setSliceDoctors] = useState<HealthWorkers[] | null>();
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
   }, [currentPage, doctors, refresh    ]);

   const HandleRefresh = () => {
      setCurrentPage(0);
      setRefresh((prev) => !prev);
   };

   return (
      <Container>
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
         <Table th={["Name", "Status", "Schedule", "Action"]}>
            {" "}
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
                     <td className="flex flex-row gap-2 justify-center">
                        <button className="bg-blue text-white px-1 py-1 rounded text-xs">
                           View
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
      </Container>
   );
};

export default HealtWorkers;
