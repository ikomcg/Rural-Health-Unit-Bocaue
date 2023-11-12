import "react-lazy-load-image-component/src/effects/blur.css";
import NewsFetch from "../../../hooks/News";
import "./GridStyle.scss";
import Content from "./Content";
import Container from "../../../components/container/Container";
import Carousel from "./view-announcement/Carousel";
import { useState } from "react";
import moment from "moment";
const Home = () => {
   const { news } = NewsFetch({});
   const [isOpen, setIsOpen] = useState(false);
   const [toView, setToView] = useState<ToViewType>({
      images: [],
      profile: "",
      name: "",
      datetime: "",
      descriptions: "",
   });
   const OnViewPost = (item: AnnouncementType) => {
      setToView({
         images: item.images,
         name: item.user.full_name,
         descriptions: item.descriptions,
         datetime: moment(item.created_at.toISOString())
            .utcOffset(8)
            .format("LLL"),
         profile: item.user.profile,
      });
   };

   return (
      <>
         <Container>
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
                           item={item}
                           onClick={() => {
                              OnViewPost(item);
                              setIsOpen(true);
                           }}
                        />
                     );
                  })
               )}
            </div>
         </Container>
         <Carousel isOpen={isOpen} setIsOpen={setIsOpen} toView={toView} />
      </>
   );
};

export default Home;
