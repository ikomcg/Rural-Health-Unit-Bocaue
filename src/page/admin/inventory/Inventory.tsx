import { useEffect, useState } from "react";
import Container from "../../../components/container/Container";
import { AiOutlineSearch } from "react-icons/ai";
import Table from "../../../components/table/Table";
import { CircularProgress, Pagination } from "@mui/material";
import style from "./style.module.scss";
import useFetchInventory from "../../../hooks/Inventory";
import { BsFillGearFill } from "react-icons/bs";
import { BlueButton } from "../../../components/button/BlueButton";
import { MdOutlineInventory } from "react-icons/md";
import CreateInventor from "./add-inventory/CreateInventor";
import UpdateInventory from "./update-inventory/UpdateInventory";

const Inventory = () => {
   const inventory = useFetchInventory();
   const [currentPage, setCurrentPage] = useState(1);
   const [pages, setPages] = useState(0);
   const [sliceInventory, setSliceInventory] = useState<Inventory[] | null>();
   const [search, setSearch] = useState("");
   const [refresh, setRefresh] = useState(false);
   const [isAdd, setIsAdd] = useState(false);
   const [toUpdate, setToUpdate] = useState<Inventory | null>(null);

   useEffect(() => {
      const SlicePagination = () => {
         if (inventory === null) return setSliceInventory(null);
         if (inventory === undefined) return;

         const filterData = inventory.filter((item) =>
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
         setSliceInventory(currentPost);
      };

      SlicePagination();
   }, [currentPage, inventory, refresh]);

   const HandleRefresh = () => {
      setCurrentPage(1);
      setRefresh((prev) => !prev);
   };

   return (
      <>
         <Container>
            <div className="flex flex-row justify-between mt-2 py-2 items-center">
               <h1 className="text-blue font-semibold text-2xl">
                  Inventory of Medicine
               </h1>
               <div className="flex flex-row w-1/2">
                  <button
                     className="text-white bg-blue text-xl px-3 py-[4px] rounded-l border border-blue"
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
            <BlueButton
               className="flex flex-row items-center justify-center gap-1 text-lg"
               onClick={() => setIsAdd(true)}
            >
               <MdOutlineInventory />
               Add
            </BlueButton>
            <Table
               th={[
                  "#",
                  "Name",
                  "Total Issued",
                  "Total Dispensed",
                  "Status",
                  "Availability",
                  "Action",
               ]}
               className={style.table}
            >
               {sliceInventory === undefined ? (
                  <tr>
                     <td className="text-center" colSpan={7}>
                        <div className="flex flex-col justify-center items-center">
                           <CircularProgress />
                           <span className="text-sm">Please wait...</span>
                        </div>
                     </td>
                  </tr>
               ) : sliceInventory === null ? (
                  <tr>
                     <td className="text-sm" colSpan={7}>
                        Error Get List!!
                     </td>
                  </tr>
               ) : sliceInventory.length === 0 ? (
                  <tr>
                     <td className="text-sm" colSpan={7}>
                        No Schedules found
                     </td>
                  </tr>
               ) : (
                  sliceInventory.map((item, i) => (
                     <tr key={item.id}>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.total_issued}</td>
                        <td>{item.total_dispensed}</td>
                        <td>{item.status}</td>
                        <td>{item.availability}</td>
                        <td className="flex flex-row gap-2 items-center justify-center">
                           <button
                              className="bg-blue text-white px-1 py-1 rounded text-xs"
                              onClick={() => setToUpdate(item)}
                           >
                              <BsFillGearFill />
                           </button>
                        </td>
                     </tr>
                  ))
               )}
            </Table>

            {sliceInventory && (
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
         </Container>

         <CreateInventor setIsPost={setIsAdd} isPost={isAdd} />

         {toUpdate && (
            <UpdateInventory setPayload={setToUpdate} payload={toUpdate} />
         )}
      </>
   );
};

export default Inventory;
