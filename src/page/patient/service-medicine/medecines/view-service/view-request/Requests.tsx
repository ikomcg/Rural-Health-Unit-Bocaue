import { useParams } from "react-router-dom";
import Table from "../../../../../../components/table/Table";
import { CircularProgress, Pagination } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useFetchMyRequestMedecine } from "../../../../../../hooks/Request";
import { BlueButton } from "../../../../../../components/button/BlueButton";
import AddRequest from "./add/Add";
import { UserProvider } from "../../../../../../context/UserProvider";
const Request = () => {
   const { id } = useParams();
   const { cookies } = useContext(UserProvider);

   const medecines = useFetchMyRequestMedecine({
      id: id,
      user_id: cookies?.id,
   });
   const [currentPage, setCurrentPage] = useState(0);
   const [sliceMedecines, setSliceMedecines] = useState<
      RequestMedecines[] | null
   >();
   const [isOpen, setIsOpen] = useState(false);
   const [pages, setPages] = useState(0);
   useEffect(() => {
      const SlicePagination = () => {
         if (medecines === null) return setSliceMedecines(null);
         if (medecines === undefined) return;

         const pages = Math.ceil(medecines.length / 10);
         setPages(pages);

         const page = currentPage + 1;
         const lastPostIndex = page * 5;
         const firstPostIndex = lastPostIndex - 5;

         const currentPost = medecines?.slice(firstPostIndex, lastPostIndex);
         setSliceMedecines(currentPost);
      };

      SlicePagination();
   }, [currentPage, medecines]);

   return (
      <>
         <div className="flex flex-row items-center mt-10">
            <h1 className="text-blue text-2xl">My Request</h1>
            <BlueButton className="ml-auto" onClick={() => setIsOpen(true)}>
               Add Request
            </BlueButton>
         </div>
         <Table th={["Medecine", "Quantity", "Status"]}>
            {sliceMedecines === undefined ? (
               <tr>
                  <td className="text-center" colSpan={3}>
                     <div className="flex flex-col justify-center items-center">
                        <CircularProgress />
                        <span className="text-sm">Please wait...</span>
                     </div>
                  </td>
               </tr>
            ) : sliceMedecines === null ? (
               <tr>
                  <td className="text-sm" colSpan={3}>
                     Error Get Request List!!
                  </td>
               </tr>
            ) : sliceMedecines.length === 0 ? (
               <tr>
                  <td className="text-sm" colSpan={3}>
                     No Request found
                  </td>
               </tr>
            ) : (
               sliceMedecines.map((item) => (
                  <tr key={item.id}>
                     <td>{item.medecine_name}</td>
                     <td>{item.quantity}</td>
                     <td>
                        <span className="bg-[gray] text-sm text-slate-100 px-2 py-1 rounded">
                           {item.status.toLocaleUpperCase()}
                        </span>
                     </td>
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
         {isOpen && <AddRequest isPost={isOpen} setIsPost={setIsOpen} />}
      </>
   );
};

export default Request;
