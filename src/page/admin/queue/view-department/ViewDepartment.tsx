import { useParams } from "react-router-dom";
import Container from "../../../../components/container/Container";
import style from "./style.module.scss";
import { useFetchQueueList } from "../../../../hooks/Department";
import { BlueButton } from "../../../../components/button/BlueButton";
import { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/Base";
import CSwal from "../../../../components/swal/Swal";
import { RedButton } from "../../../../components/button/RedButton";

const ViewDepartment = () => {
   const { id, name } = useParams();
   const [isLoading, setIsLoading] = useState(false);
   const queueLists = useFetchQueueList({ id });
   const currentQueue = queueLists?.find((item) => item.status === "current");
   const waitingQueue = queueLists?.filter((item) => item.status === "waiting");

   const NextQueueHandle = async () => {
      if (!id || !waitingQueue) return;

      setIsLoading(true);
      const nextQueue = waitingQueue[0];

      if (currentQueue) {
         await deleteDoc(doc(db, `queue`, id, "queue-list", currentQueue.id))
            .then(() => {})
            .catch(() => {});
      }

      await updateDoc(doc(db, `queue`, id, "queue-list", nextQueue.id), {
         status: "current",
      })
         .then(() => {})
         .catch((err) => {
            CSwal({
               icon: "error",
               title: err.code ?? "Network Error",
            });
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   const FinishQueueHandle = async () => {
      if (!id || !currentQueue) return;
      setIsLoading(true);
      await deleteDoc(doc(db, `queue`, id, "queue-list", currentQueue.id))
         .then(() => {})
         .catch((err) => {
            CSwal({
               icon: "error",
               title: err.code ?? "Network Error",
            });
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   return (
      <Container
         style={{
            overflow: "hidden",
         }}
      >
         <h1 className="text-4xl text-blue text-center">RURAL HEALTH UNIT</h1>
         <h2 className="text-center text-2xl">BOCAUE, BULACAN</h2>
         {queueLists === undefined ? (
            <h1 className="text-center text-gray-400 w-full">Loading...</h1>
         ) : queueLists === null ? (
            <h1 className="text-center text-gray-400">
               OOPS! Something went wrong
            </h1>
         ) : (
            <>
               <div className={`flex flex-row w-full gap-3 mt-10`}>
                  <div className={`${style.department} w-1/2`}>
                     <h3>DEPARTMENT</h3>
                     <h4>{name?.toLocaleUpperCase()}</h4>
                  </div>
                  <div className={`${style.current} w-1/2`}>
                     <h3>CURRENT</h3>
                     <h4>{currentQueue?.token_number ?? "-----"}</h4>
                  </div>
               </div>
               <div className="flex flex-row justify-around mt-3">
                  <div className="grid justify-center gap-3 w-1/2">
                     <BlueButton
                        className="py-3 px-5 shadow"
                        disabled={isLoading}
                        onClick={NextQueueHandle}
                     >
                        NEXT
                     </BlueButton>
                  </div>
                  <div className="flex flex-row justify-center  gap-3 w-1/2">
                     <RedButton
                        className="py-3 px-5 shadow"
                        disabled={isLoading}
                        onClick={FinishQueueHandle}
                     >
                        FINISH
                     </RedButton>
                  </div>
               </div>
               <div className="w-full overflow-x-auto mt-5">
                  <div className={`inline-flex gap-3 overflow-sroll pb-2`}>
                     {waitingQueue?.map((item) => (
                        <div key={item.id} className={`${style.waiting_Card}`}>
                           <h3>{item.token_number}</h3>
                           <span className="text-blue">
                              {name?.toLocaleUpperCase()}
                           </span>
                           <span>Waiting</span>
                        </div>
                     ))}
                  </div>
               </div>
            </>
         )}
      </Container>
   );
};

export default ViewDepartment;
