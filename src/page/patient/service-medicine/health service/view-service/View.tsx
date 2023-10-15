import { useParams } from "react-router-dom";
import Doctors from "./doctors/Doctors";
import Request from "./view-request/Requests";

const ViewService = () => {
   const { name } = useParams();

   return (
      <>
         <div className="flex flex-col">
            <h1 className="text-blue text-2xl mt-10">{name}</h1>
            <Doctors />
            <hr className="mt-10 border border-blue" />
            <Request />
         </div>
      </>
   );
};

export default ViewService;
