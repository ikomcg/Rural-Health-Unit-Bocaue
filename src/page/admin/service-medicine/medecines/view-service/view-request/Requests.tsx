import { useParams } from "react-router-dom";
import Table from "../../../../../../components/table/Table";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Pagination from "../../../../../../components/pagination/Pagination";
import { BlueButton } from "../../../../../../components/button/BlueButton";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../firebase/Base";
import { RedButton } from "../../../../../../components/button/RedButton";
import Swal from "sweetalert2";
import { useFetchRequestMedecine } from "../../../../../../hooks/Request";
const Request = () => {
   const { id } = useParams();
   const medecine = useFetchRequestMedecine({ id: id });
   const [currentPage, setCurrentPage] = useState(0);
   const [sliceMedecines, setSliceMedecines] = useState<
      RequestMedecines[] | null
   >();

   useEffect(() => {
      const SlicePagination = () => {
         if (medecine === null) return setSliceMedecines(null);

         const page = currentPage + 1;
         const lastPostIndex = page * 5;
         const firstPostIndex = lastPostIndex - 5;

         const currentPost = medecine?.slice(firstPostIndex, lastPostIndex);
         setSliceMedecines(currentPost);
      };

      SlicePagination();
   }, [currentPage, medecine]);

   const OnChangeStatus = async (requestID: string, status: string) => {
      if (!id) return;

      await updateDoc(doc(db, "medecine_request", requestID), { status })
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
         <Table th={["Patient", "Medecine", "Quantity", "Action"]}>
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
                     <td>{item.patient_name}</td>
                     <td>{item.medecine_name}</td>
                     <td>{item.quantity}</td>
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

         {medecine && (
            <Pagination
               limit={5}
               count={medecine.length}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
               className="mt-3"
            />
         )}
      </>
   );
};

export default Request;
