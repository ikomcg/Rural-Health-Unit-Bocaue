import style from "./Style.module.scss";

type NewsCardType = {
   data: {
      link: string;
      media: string;
      title: string;
      summary: string;
   };
};
const NewsCard = ({ data }: NewsCardType) => {
   return (
      <a
         href={data.link}
         className={`${style.covid_19_news} flex w-full md:w-1/2 px-3`}
         rel="noreferrer"
         target="_blank"
      >
         <div className="flex flex-col md:flex-row flex-nowrap shadow">
            <img
               className="w-[200px] h-[200px] mx-auto md:w-[100px] md:h-[100px]"
               loading="lazy"
               src={data.media}
            />
            <div className="px-3">
               <h5 className="text-xl sm:text-2xl font-bold">{data.title}</h5>
               <p className="text-black">{data.summary}</p>
            </div>
         </div>
      </a>
   );
};

export default NewsCard;
