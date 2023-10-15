import { useParams } from "react-router-dom";
import Table from "../../../../../../components/table/Table";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Pagination from "../../../../../../components/pagination/Pagination";
import { useFetchMedecineListService } from "../../../../../../hooks/Medecines";

const Medecines = () => {
   const { id } = useParams();
   const medecines = useFetchMedecineListService({ id: id });


   const [currentPage, setCurrentPage] = useState(0);
   const [sliceMedecines, setSliceMedecines] = useState<
      MedecineList[] | null
   >();

   useEffect(() => {
      const SlicePagination = () => {
         if (medecines === null) return setSliceMedecines(null);

         const page = currentPage + 1;
         const lastPostIndex = page * 10;
         const firstPostIndex = lastPostIndex - 10;

         const currentPost = medecines?.slice(firstPostIndex, lastPostIndex);
         setSliceMedecines(currentPost);
      };

      SlicePagination();
   }, [currentPage, medecines]);

   return (
      <>
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
               limit={10}
               count={medecines.length}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
               className="mt-3"
            />
         )}
      </>
   );
};

export default Medecines;
