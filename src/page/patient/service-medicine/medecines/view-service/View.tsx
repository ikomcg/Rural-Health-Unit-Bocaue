import { useParams } from "react-router-dom";
import MedList from "./medecines/Medecines";
import Request from "./view-request/Requests";

const ViewService = () => {
   const { name } = useParams();

   return (
      <>
         <div className="flex flex-col">
            <h1 className="text-blue text-2xl mt-10">{name}</h1>
            <MedList />
            <br />
            <Request />
         </div>
      </>
   );
};

export default ViewService;
