import { Link } from "react-router-dom";
type TopicHeaderType = {
   title: string;
};
const TopicHeader = ({ title }: TopicHeaderType) => {
   return (
      <div className="flex flex-row justify-between border-b py-5 px-3 mb-5">
         <h3 className="text-4xl text-blue font-nomal">{title}</h3>
         <Link to="" className="text-2xl text-black font-normal">
            See all
         </Link>
      </div>
   );
};

export default TopicHeader;
