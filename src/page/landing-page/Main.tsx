import FastingDiet from "../../images/section-topic/img-1.jpg";
import FastFood from "../../images/section-topic/img-2.jpg";
import DietRigh from "../../images/section-topic/img-3.jpg";
import Topic from "./Topic";
import style from "./style.module.scss";
import "./style.scss";

const topic = [
   {
      src: FastFood,
      title: "Learn What's Really in Your Favorite Fast Food",
   },
   {
      src: DietRigh,
      title: "Is a fasting Diet Right for You?",
   },
];

const Main = () => {
   return (
      <main className={style.container}>
         <div className="wrap">
            <div className="relative rounded-xl overflow-hidden cursor-pointer hover:scale-101">
               <img loading="lazy" src={FastingDiet} />
               <div className="topic-info absolute bottom-5 p-3">
                  <h3 className="text-2xl text-blue font-bold">
                     Is a fasting Diet Right for You?
                  </h3>
                  <p>
                     Weight loss, lower blood pressure, less inflammation --
                     these are just a few reasons why this diet is so popular.
                  </p>
               </div>
            </div>

            <div className={style.right_topic}>
               <Topic topic={topic} />
            </div>
         </div>
      </main>
   );
};

export default Main;
