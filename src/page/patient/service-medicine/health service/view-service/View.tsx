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
            <br />
            <Request />
         </div>
      </>
   );
};

export default ViewService;
