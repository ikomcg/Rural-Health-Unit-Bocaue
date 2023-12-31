import { useParams } from "react-router-dom";
import Table from "../../../../../../components/table/Table";
import { CircularProgress, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { BlueButton } from "../../../../../../components/button/BlueButton";
import { doc, runTransaction, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../firebase/Base";
import { RedButton } from "../../../../../../components/button/RedButton";
import Swal from "sweetalert2";
import { useFetchRequestMedecine } from "../../../../../../hooks/Request";
import { AiOutlineSearch } from "react-icons/ai";
import { CreateRapidApi } from "../../../../../../api/SMS/SendSMS";

const Request = () => {
   const { id } = useParams();
   const medecine = useFetchRequestMedecine({ id: id });
   const [currentPage, setCurrentPage] = useState(1);
   const [sliceMedecines, setSliceMedecines] = useState<
      RequestMedecines[] | null
   >();
   const [search, setSearch] = useState("");
   const [refresh, setRefresh] = useState(false);
   const [pages, setPages] = useState(0);

   useEffect(() => {
      const SlicePagination = () => {
         if (medecine === null) return setSliceMedecines(null);
         if (medecine === undefined) return;

         const filterData = medecine.filter((item) =>
            item.patient.full_name
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
   }, [currentPage, medecine, refresh]);

   const HandleRefresh = () => {
      setCurrentPage(1);
      setRefresh((prev) => !prev);
   };

   const OnChangeStatus = async (request: RequestMedecines, status: string) => {
      if (!id) return;

      if (status === "decline") {
         const sfDocRef = doc(
            db,
            `medecines`,
            id,
            "medecines",
            request.medicine_id
         );
         await runTransaction(db, async (transaction) => {
            const sfDoc = await transaction.get(sfDocRef);
            if (!sfDoc.exists()) {
               throw "Document does not exist!";
            }

            const newStock =
               Number(sfDoc.data().stock_in) + Number(request.quantity);

            transaction.update(sfDocRef, {
               stock_in: newStock.toString(),
            });
         });
      }

      await updateDoc(doc(db, "medicine_request", request.id), {
         status,
         quantity: request.quantity,
      })
         .then(async () => {
            await CreateRapidApi({
               endPoint: "sms/send",
               token: "Y291cnNlaGVyN0BnbWFpbC5jb206OTE0QzY4M0YtM0NCMy0xRkY0LTBFRUQtRTMxMUZENEFBQkM2",
               data: {
                  messages: [
                     {
                        from: "RHU",
                        body: `Your Request ${
                           request.medicine.name
                        } in RHU Bocaue has been ${
                           status === "approve" ? "APPROVED" : "DECLINE"
                        }`,
                        to: request.patient.contact_no,
                     },
                  ],
               },
            });
         })
         .catch((err) => {
            Swal.fire({
               icon: "error",
               title: err.code,
            });
         });
   };

   const OnChangeQuantity = (
      id: string,
      e: React.ChangeEvent<HTMLInputElement>
   ) => {
      setSliceMedecines((prev) =>
         prev
            ? [
                 ...prev.map((item) => {
                    if (id === item.id) {
                       return {
                          ...item,
                          quantity: e.target.value,
                       };
                    }
                    return item;
                 }),
              ]
            : null
      );
   };

   return (
      <>
         <div className="flex flex-row justify-between items-center mt-10">
            <h1 className="text-blue text-2xl ">Patient's Request</h1>
            <div className="flex flex-row items-center w-[40%]">
               <button
                  className="text-white bg-blue text-xl px-2 py-[6px] rounded-l border border-blue"
                  onClick={HandleRefresh}
               >
                  <AiOutlineSearch />
               </button>
               <input
                  type="text"
                  placeholder="Search...."
                  className="border border-blue px-2 py-1 rounded-r w-[90%]"
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
         </div>
         <Table th={["Patient", "Medecine", "Quantity", "Action"]}>
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
                     Error Get Request List!!
                  </td>
               </tr>
            ) : sliceMedecines.length === 0 ? (
               <tr>
                  <td className="text-sm" colSpan={4}>
                     No Request found
                  </td>
               </tr>
            ) : (
               sliceMedecines.map((item) => (
                  <tr key={item.id}>
                     <td>{item.patient.full_name}</td>
                     <td>{item.medicine.name}</td>
                     <td>
                        <input
                           type="text"
                           className="border border-blue w-[50px] text-center"
                           value={item.quantity}
                           onChange={(e) => OnChangeQuantity(item.id, e)}
                        />
                     </td>
                     <td className="flex flex-col gap-2 justify-center items-center">
                        <BlueButton
                           disabled={item.status === "approve"}
                           onClick={() => OnChangeStatus(item, "approve")}
                        >
                           Approved
                        </BlueButton>
                        <RedButton
                           onClick={() => OnChangeStatus(item, "decline")}
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

export default Request;
