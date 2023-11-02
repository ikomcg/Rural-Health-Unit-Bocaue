import { useEffect, useState } from "react";
import Container from "../../../components/container/Container";
import Table from "../../../components/table/Table";
import useFetchUsers from "../../../hooks/Users";
import { CircularProgress, Pagination } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import { BsDot, BsFillGearFill } from "react-icons/bs";
import style from "./style.module.scss";
import UpdateUser from "../../shared/update-user/UpdateUser";
import DateTimeLocal from "../../../shared/DateTimeLocal";

const HealtWorkers = () => {
   const doctors = useFetchUsers({
      role: ["doctor", "health-worker", "admin"],
   });
   const [currentPage, setCurrentPage] = useState(1);
   const [pages, setPages] = useState(0);
   const [sliceDoctors, setSliceDoctors] = useState<UserType[] | null>();
   const [search, setSearch] = useState("");
   const [refresh, setRefresh] = useState(false);
   const [toUpdate, setToUpdate] = useState<UserType | null>(null);

   useEffect(() => {
      const SlicePagination = () => {
         if (doctors === null) return setSliceDoctors(null);
         if (doctors === undefined) return;

         const filterData = doctors.filter((item) =>
            item.full_name
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
         setSliceDoctors(currentPost);
      };

      SlicePagination();
   }, [currentPage, doctors, refresh]);

   const HandleRefresh = () => {
      setCurrentPage(1);
      setRefresh((prev) => !prev);
   };

   return (
      <>
         <Container>
            <div className="flex flex-row justify-between mt-2 py-2 items-center px-3">
               <h1 className="text-blue font-semibold text-2xl">
                  Health Workers
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
            <Table
               th={["#", "Name", "Role", "Status", "Action"]}
               className={style.table}
            >
               {" "}
               {sliceDoctors === undefined ? (
                  <tr>
                     <td className="text-center" colSpan={5}>
                        <div className="flex flex-col justify-center items-center">
                           <CircularProgress />
                           <span className="text-sm">Please wait...</span>
                        </div>
                     </td>
                  </tr>
               ) : sliceDoctors === null ? (
                  <tr>
                     <td className="text-sm" colSpan={5}>
                        Error Get List!!
                     </td>
                  </tr>
               ) : sliceDoctors.length === 0 ? (
                  <tr>
                     <td className="text-sm" colSpan={5}>
                        No Schedules found
                     </td>
                  </tr>
               ) : (
                  sliceDoctors.map((item, i) => (
                     <tr key={item.id}>
                        <td>{i + 1}</td>
                        <td>
                           <div className="flex flex-row items-center gap-2">
                              <img
                                 className={style.profile}
                                 src={item.profile}
                                 alt={item.profile}
                              />{" "}
                              <span>{item.full_name}</span>
                           </div>
                        </td>
                        <td>{item.role[0]}</td>
                        <td>
                           <span className="flex flex-row justify-center items-center">
                              <BsDot
                                 className={`${
                                    item.status === "online"
                                       ? "text-green-500"
                                       : "text-yellow-500"
                                 } text-4xl`}
                              />{" "}
                              {item.status}
                           </span>
                        </td>
                        <td className="flex flex-row gap-2 items-center justify-center">
                           <button
                              className="bg-blue text-white px-1 py-1 rounded text-xs"
                              onClick={() =>
                                 setToUpdate({
                                    ...item,
                                    birthday: DateTimeLocal(item.birthday),
                                 })
                              }
                           >
                              <BsFillGearFill />
                           </button>
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
         </Container>
         {toUpdate && (
            <UpdateUser payload={toUpdate} setPayload={setToUpdate} />
         )}
      </>
   );
};

export default HealtWorkers;
