import { memo } from "react";
import TopicHeader from "../../components/home/TopicHeader";
import { useFetch } from "../../hooks/Hooks";
import { RotatingLines } from "react-loader-spinner";

import NewsCard from "../../components/home/NewsCard";

const News = () => {
   const { data, isLoading } = useFetch({
      url: "https://covid-19-news.p.rapidapi.com/v1/covid?q=covid&lang=en&media=True",
   });

   return (
      <div className="covid-news wrap mx-5">
         <TopicHeader title="Covid-19 News" />
         <div
            className={`flex flex-row flex-wrap gap-y-5 ${
               isLoading && "justify-center"
            }`}
         >
            {isLoading ? (
               <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="96"
                  visible={true}
               />
            ) : data !== undefined ? (
               data.map(
                  (
                     data: {
                        link: string;
                        media: string;
                        title: string;
                        summary: string;
                     },
                     index: number
                  ) => {
                     if (index > 5) return;
                     return <NewsCard key={index} data={data} />;
                  }
               )
            ) : (
               <h2 className="text-5xl w-full text-center my-5 font-bold text-blue">
                  This section is free api only
               </h2>
            )}
         </div>
      </div>
   );
};

export default memo(News);
