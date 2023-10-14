import "react-lazy-load-image-component/src/effects/blur.css";
import NewsFetch from "../../../hooks/News";
import "./GridStyle.scss";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/Base";
import Content from "./Content";

const List = () => {
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

   return (
      <div className="flex flex-col items-center overflow-y-auto w-full">
         {news === undefined ? (
            <h1 className="text-center text-gray-400">Loading...</h1>
         ) : news === null ? (
            <h1 className="text-center text-gray-400">Something went wrong</h1>
         ) : (
            news.map((item) => {
               return <Content item={item} OnDeletePost={OnDeletePost} />;
            })
         )}
      </div>
   );
};

export default List;
