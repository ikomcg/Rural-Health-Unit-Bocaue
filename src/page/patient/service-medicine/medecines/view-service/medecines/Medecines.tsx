import { useParams } from "react-router-dom";
import Table from "../../../../../../components/table/Table";
import { CircularProgress, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useFetchMedecineListService } from "../../../../../../hooks/Medecines";
import { AiOutlineSearch } from "react-icons/ai";

const Medecines = () => {
   const { id } = useParams();
   const medecines = useFetchMedecineListService({ id: id });

   const [currentPage, setCurrentPage] = useState(1);
   const [sliceMedecines, setSliceMedecines] = useState<
      MedecineList[] | null
   >();
   const [search, setSearch] = useState("");
   const [refresh, setRefresh] = useState(false);
   const [pages, setPages] = useState(0);

   useEffect(() => {
      const SlicePagination = () => {
         if (medecines === null) return setSliceMedecines(null);
         if (medecines === undefined) return;

         const filterData = medecines.filter((item) =>
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
         setSliceMedecines(currentPost);
      };

      SlicePagination();
   }, [currentPage, medecines, refresh]);

   const HandleRefresh = () => {
      setCurrentPage(1);
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
         <Table th={["Medecines", "Descriptions", "Stock"]}>
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
                     Error Get Medecine List!
                  </td>
               </tr>
            ) : sliceMedecines.length === 0 ? (
               <tr>
                  <td className="text-sm" colSpan={4}>
                     No Medecines found
                  </td>
               </tr>
            ) : (
               sliceMedecines.map((item) => (
                  <tr key={item.id}>
                     <td>{item.name}</td>
                     <td>{item.descriptions}</td>
                     <td>{item.stock}</td>
                  </tr>
               ))
            )}
         </Table>

         {medecines && (
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

export default Medecines;
