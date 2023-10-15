import "react-lazy-load-image-component/src/effects/blur.css";
import NewsFetch from "../../../hooks/News";
import "./GridStyle.scss";
import Content from "./Content";
import Container from "../../../components/container/Container";
const Home = () => {
   const { news } = NewsFetch();

   return (
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
                  return <Content item={item} />;
               })
            )}
         </div>
      </Container>
   );
};

export default Home;
