import AnnouncementList from "./announcement-list/List";
import { BsGear } from "react-icons/bs";
import { useContext, useState } from "react";
import PostAnnouncement from "./create-announcement/CreateAnnouncement";
import Container from "../../../components/container/Container";
import Carousel from "./view-announcement/Carousel";
import { JSXCSwal } from "../../../components/swal/Swal";
import { UserProvider } from "../../../context/UserProvider";
import ManageList from "./manage-post/ManageList";

const Announcements = () => {
   const { cookies } = useContext(UserProvider);
   const [isOpen, setIsOpen] = useState(false);
   const [isManagePost, setIsManagePost] = useState(false);
   const [toView, setToView] = useState<ToViewType>({
      images: [],
      profile: "",
      name: "",
      datetime: "",
      descriptions: "",
   });
   const CreateAnnouncement = () => {
      if (!cookies) return;
      JSXCSwal({
         children: <PostAnnouncement cookies={cookies} />,
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

               <button
                  className="flex flex-row gap-2 bg-white items-center px-2 rounded-md"
                  onClick={() => setIsManagePost((prev) => !prev)}
               >
                  {isManagePost ? (
                     "Back"
                  ) : (
                     <>
                        <BsGear />
                        Manage Post
                     </>
                  )}
               </button>
            </div>
            {isManagePost ? (
               <ManageList setToView={setToView} setIsOpen={setIsOpen} />
            ) : (
               <AnnouncementList setToView={setToView} setIsOpen={setIsOpen} />
            )}
         </Container>
         <Carousel isOpen={isOpen} setIsOpen={setIsOpen} toView={toView} />
      </>
   );
};

export default Announcements;
