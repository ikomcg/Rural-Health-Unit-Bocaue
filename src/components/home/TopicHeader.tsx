import { Link } from "react-router-dom";
import style from "./Style.module.scss";

type TopicHeaderType = {
   title: string;
};
const TopicHeader = ({ title }: TopicHeaderType) => {
   return (
      <div className={`flex flex-row justify-between border-b pt-5 px-3 mb-5 ${style.header_topic}`}>
         <h3 className="text-4xl text-blue font-nomal">{title}</h3>
         <Link to="" className="text-2xl text-black font-normal">
            See all
         </Link>
      </div>
   );
};

export default TopicHeader;
