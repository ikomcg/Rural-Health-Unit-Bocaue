import AnnouncementList from "./content/List";
import { BsGear } from "react-icons/bs";
import { useState } from "react";
import PostAnnouncement from "./create-announcement/Post";
import Container from "../../../components/container/Container";
import Carousel from "./view-announcement/Carousel";
import { JSXCSwal } from "../../../components/swal/Swal";

const Announcements = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [toView, setToView] = useState<ToViewType>({
      images: [],
      profile: "",
      name: "",
      datetime: "",
      descriptions: "",
   });

   const CreateAnnouncement = () => {
      JSXCSwal({
         children: <PostAnnouncement />,
         showConfirmButton: false,
      });
   };

   return (
      <>
         <Container>
            <div className="flex flex-row gap-2 w-[90%] bg-blue rounded-md mx-auto py-2 px-4 mb-8">
               <button
                  className="rounded-md bg-white p-2 w-1/2 text-left mr-auto"
                  onClick={CreateAnnouncement}
               >
                  New Announcement...
               </button>
               <button
                  className="flex flex-row gap-2 bg-white items-center px-2 rounded-md"
                  onClick={CreateAnnouncement}
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
            <AnnouncementList setToView={setToView} setIsOpen={setIsOpen} />
         </Container>
         <Carousel isOpen={isOpen} setIsOpen={setIsOpen} toView={toView} />
      </>
   );
};

export default Announcements;
