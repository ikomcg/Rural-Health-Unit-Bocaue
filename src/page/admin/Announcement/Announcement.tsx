import AnnouncementList from "./List";
import { BsGear } from "react-icons/bs";
import { useState } from "react";
import Post from "./Post";
import Container from "../../../components/container/Container";

const Announcement = () => {
   const [isPost, setIsPost] = useState(false);

   const HandleOnClick = () => {
      setIsPost((prev) => !prev);
   };
   return (
      <>
         <Container>
            <div className="flex flex-row gap-2 w-[90%] bg-blue rounded-md mx-auto py-2 px-4 mb-8">
               <button
                  className="rounded-md bg-white p-2 w-1/2 text-left mr-auto"
                  onClick={HandleOnClick}
               >
                  New Announcement...
               </button>
               <button
                  className="flex flex-row gap-2 bg-white items-center px-2 rounded-md"
                  onClick={HandleOnClick}
               >
                  <img
                     width="30"
                     height="30"
                     src="https://img.icons8.com/fluency/48/image--v1.png"
                     alt="image--v1"
                  />
                  Image
               </button>
               <button className="flex flex-row gap-2 bg-white items-center px-2 rounded-md">
                  <BsGear />
                  Manage Post
               </button>
            </div>
            <AnnouncementList />
         </Container>

         <Post isPost={isPost} setIsPost={setIsPost} />
      </>
   );
};

export default Announcement;
