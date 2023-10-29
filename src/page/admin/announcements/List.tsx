import "react-lazy-load-image-component/src/effects/blur.css";
import NewsFetch from "../../../hooks/News";
import "./GridStyle.scss";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/Base";
import Content from "./Content";
import moment from "moment";

type ListType = {
   setToView: React.Dispatch<React.SetStateAction<ToViewType>>;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const List = ({ setToView, setIsOpen }: ListType) => {
   const { news } = NewsFetch();

   const OnDeletePost = async (id: string) => {
      return await deleteDoc(doc(db, "announcements", id))
         .then(() => {
            return true;
         })
         .catch(() => {
            return false;
         });
   };

   const OnViewPost = (item: AnnouncementType) => {
      setToView({
         images: item.images,
         name: item.user.name,
         descriptions: item.descriptions,
         datetime: moment(item.created_at.toISOString())
            .utcOffset(8)
            .format("LLL"),
         profile: item.user.profile,
      });
   };
   return (
      <>
         <div className="flex flex-col items-center overflow-y-auto w-full">
            {news === undefined ? (
               <h1 className="text-center text-gray-400">Loading...</h1>
            ) : news === null ? (
               <h1 className="text-center text-gray-400">
                  Something went wrong
               </h1>
            ) : (
               news.map((item) => {
                  return (
                     <Content
                        key={item.id}
                        item={item}
                        OnDeletePost={OnDeletePost}
                        onClick={() => {
                           OnViewPost(item);
                           setIsOpen(true);
                        }}
                     />
                  );
               })
            )}
         </div>
      </>
   );
};

export default List;
