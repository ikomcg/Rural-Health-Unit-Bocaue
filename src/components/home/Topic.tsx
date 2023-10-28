import React from "react";
type CardType = {
   topic : {
     src : string
     title: string
   }[]
 }

const Topic = ({ topic }: CardType) => {
   return (
      <>
         {topic.map((topic, index) => {
            return (
               <div
                  key={index}
                  className="flex relative rounded-xl overflow-hidden cursor-pointer hover:scale-101"
               >
                  <img loading="lazy" src={topic.src} />
                  <div className="topic-info bottom-5 absolute p-3">
                     <h3 className="text-2xl text-blue font-bold">
                        {topic.title}
                     </h3>
                  </div>
               </div>
            );
         })}
      </>
   );
};

export default React.memo(Topic);
