import Subscribes from "../forms/Subscribes";

import { BsFacebook } from "react-icons/bs";
import { TiSocialYoutube, TiSocialTwitter } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";

const socialIcons = [
   <BsFacebook />,
   <TiSocialTwitter />,
   <TiSocialYoutube />,
   <SlSocialInstagram />,
];

const LeftFooter = () => {
   return (
      <div className="left-footer w-1/2 px-5">
         <div className="flex flex-col justify-center items-center my-5">
            <h1 className="text-5xl first-letter:text-blue font-bold">
               RURAL HEALTH UNIT
            </h1>
            <ul className="flex flex-row my-5 gap-5 ">
               {socialIcons.map((items, index) => (
                  <li className="text-2xl" key={index}>
                     {items}
                  </li>
               ))}
            </ul>
         </div>
         <div className="m-8">
            <span className="text-2xl text-black font-bold">
               Get our wellness newsletter
            </span>
            <p className="text-lg tex-black text-normal">
               Filter out the noise and nurture your inbox with health and
               wellness advice that's inclusive and rooted in medical expertise.
            </p>
            <div className="my-7">
               <Subscribes />
               <span className="text-lg text-blue font-normal leading-3">
                  Your privacy is important to us
               </span>
            </div>
         </div>
      </div>
   );
};

export default LeftFooter;
