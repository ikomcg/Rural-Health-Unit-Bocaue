import { useParams } from "react-router-dom";
import Container from "../../../../components/container/Container";
import style from "./style.module.scss";
import { useFetchQueueList } from "../../../../hooks/Department";
import { BlueButton } from "../../../../components/button/BlueButton";
import { useContext, useState } from "react";
import { UserProvider } from "../../../../context/UserProvider";
import { serverTimestamp } from "firebase/firestore";
import { CreateRequestQueueFrb } from "../../../../firebase/queue/Create";
import CSwal from "../../../../components/swal/Swal";

const ViewDepartment = () => {
   const { id, name } = useParams();
   const { cookies } = useContext(UserProvider);

   const queueLists = useFetchQueueList({ id });
   const currentQueue = queueLists?.find((item) => item.status === "current");
   const userToken = queueLists?.find((item) => item.patient === cookies?.id);
   const [isLoading, setIsLoading] = useState(false);

   const GetToken = async () => {
      if (!cookies?.is_verify) {
         CSwal({
            icon: "info",
            title: "Account not Verified",
            text: "Contact Rural Health Unit to verify your account",
         });
         return;
      }
      if (!id) return;
      setIsLoading(true);
      const words = name?.split(" ");
      const firstLetters = words?.map((word) => word.charAt(0));
      const tokenName = firstLetters?.join("");

      const create = await CreateRequestQueueFrb({
         data: {
            patient: cookies?.id,
            department: id,
            token_number: `${tokenName}-${Math.floor(
               Math.random() * (99 - 1) + 1
            )}`,
            status: "waiting",
            created_at: serverTimestamp(),
         },
      });
      setIsLoading(false);
      if (!create) {
         CSwal({
            icon: "error",
            title: "Someting went wrong",
         });
         return;
      }
   };

   return (
      <Container
         style={{
            overflow: "hidden",
         }}
      >
         <h1 className="text-4xl text-blue text-center">RURAL HEALTH UNIT</h1>
         <h2 className="text-center text-2xl">BOCAUE, BULACAN</h2>

         <div
            className={`flex flex-col md:flex-row gap-5 mt-10 h-full overflow-hidden`}
         >
            {queueLists === undefined ? (
               <h1 className="text-center text-gray-400 w-full mt-20">
                  Loading...
               </h1>
            ) : queueLists === null ? (
               <h1 className="text-center text-gray-400 mt-20 w-full">
                  OOPS! Something went wrong
               </h1>
            ) : (
               <>
                  <div className="flex flex-col w-full md:w-[60%]">
                     <div className={` ${style.proceed_Card}`}>
                        <h3>Token Number</h3>
                        <h2>
                           {currentQueue ? currentQueue.token_number : "-----"}
                        </h2>
                        <span>Please Proceed to</span>
                        <span className="text-blue">
                           {currentQueue ? name?.toLocaleUpperCase() : "-----"}
                        </span>
                     </div>
                     <div className={`mt-5 ${style.proceed_Card}`}>
                        <h3>Your Number</h3>
                        <h2>{userToken ? userToken.token_number : "-----"}</h2>
                        <span className="text-red-500">
                           {userToken
                              ? userToken.status.toLocaleUpperCase()
                              : "-----"}
                        </span>
                        <span className="text-blue">
                           {name?.toLocaleUpperCase()}
                        </span>
                     </div>
                     <BlueButton
                        disabled={isLoading || userToken !== undefined}
                        className="py-2 mx-auto mt-3"
                        onClick={GetToken}
                     >
                        Get Token
                     </BlueButton>
                  </div>
                  <div
                     className={`flex flex-row md:flex-col gap-3 w-full md:w-[40%] h-[85%] overflow-auto pb-3`}
                  >
                     {queueLists
                        .filter((item) => item.status === "waiting")
                        .map((item) => (
                           <div
                              key={item.id}
                              className={`${style.waiting_Card}`}
                           >
                              <h3>{item.token_number}</h3>
                              <span className="text-blue">
                                 {name?.toLocaleUpperCase()}
                              </span>
                              <span>Waiting</span>
                           </div>
                        ))}
                  </div>
               </>
            )}
         </div>
      </Container>
   );
};

export default ViewDepartment;
