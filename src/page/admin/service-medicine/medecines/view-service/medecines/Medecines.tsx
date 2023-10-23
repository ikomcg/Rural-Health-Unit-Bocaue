import { useParams } from "react-router-dom";
import Table from "../../../../../../components/table/Table";
import { CircularProgress, Pagination } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../../firebase/Base";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useFetchMedecineListService } from "../../../../../../hooks/Medecines";
import UpdateMedecine from "./UpdateMedecine";

type PayloadType = object & Omit<MedecineList, "created_at">;

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
   const [payload, setPayload] = useState<PayloadType | undefined>();

   const OnDeleteList = async (itemID: string) => {
      if (!id) return;
      Swal.fire({
         icon: "info",
         title: "Are you sure you want to delete?",
         showCancelButton: true,
         showConfirmButton: true,
      }).then(async (res) => {
         if (res.isConfirmed) {
            return await deleteDoc(
               doc(db, "medecines", id, "medecines", itemID)
            )
               .then(() => {
                  return Swal.fire({
                     icon: "success",
                     text: "Deleted Medecines Successfuly",
                  });
               })
               .catch(() => {
                  return Swal.fire({
                     icon: "error",
                     text: "Failed to Deleted Medecines",
                  });
               });
         }
      });
   };

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
         const page = currentPage;
         const lastPostIndex = page * 10;
         const firstPostIndex = lastPostIndex - 10;

         const currentPost = filterData?.slice(firstPostIndex, lastPostIndex);
         setSliceMedecines(currentPost);
      };

      SlicePagination();
   }, [currentPage, medecines, refresh]);

   const HandleRefresh = () => {
      setCurrentPage(0);
      setRefresh((prev) => !prev);
   };

   const OnClickEdit = (item: MedecineList) => {
      setPayload({
         id: item.id,
         name: item.name,
         descriptions: item.descriptions,
         stock: item.stock,
      });
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
         <Table th={["Medecines", "Descriptions", "Stock", "Action"]}>
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
                     <td className="flex flex-row gap-2 justify-center">
                        <button
                           className="bg-red-500 px-1 py-1 rounded text-xs"
                           onClick={() => OnDeleteList(item.id)}
                        >
                           <FaTrash className="text-white" />
                        </button>
                        <button
                           className="bg-blue px-1 py-1 rounded text-xs"
                           onClick={() => OnClickEdit(item)}
                        >
                           <AiFillEdit className="text-white" />
                        </button>
                     </td>
                  </tr>
               ))
            )}
         </Table>

         {medecines && (
            <Pagination
               page={currentPage}
               count={pages}
               variant="outlined"
               shape="rounded"
               color="primary"
               onChange={(_e, page) => setCurrentPage(page)}
            />
         )}
         {payload && (
            <UpdateMedecine payload={payload} setPayload={setPayload} />
         )}
      </>
   );
};

export default Medecines;
