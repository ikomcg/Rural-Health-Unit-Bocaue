import React, { SetStateAction, useState } from "react";
import DialogSlide from "../../../../components/mui/dialog/SlideModal";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import style from "./style.module.scss";
import MDEditor from "@uiw/react-md-editor";
import { LazyLoadImage } from "react-lazy-load-image-component";

type CarouselType = {
   toView: ToViewType;
   isOpen: boolean;
   setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};
const Carousel = ({ toView, isOpen, setIsOpen }: CarouselType) => {
   const [activeIndex, setActiveIndex] = useState(0);

   return (
      <DialogSlide
         fullWidth={isOpen}
         maxWidth="md"
         open={isOpen}
         setOpen={setIsOpen}
         onClose={() => {
            setIsOpen(false);
            setActiveIndex(0);
         }}
         className={style.dialog_slide}
      >
         <div className={style.container}>
            <div>
               <div className="relative">
                  <button
                     className={style.btn_prev}
                     onClick={() => {
                        if (activeIndex === 0) return;
                        setActiveIndex((prev) => prev - 1);
                     }}
                  >
                     <AiOutlineLeft />
                  </button>
                  <button
                     className={style.btn_next}
                     onClick={() => {
                        if (activeIndex + 1 === toView.images.length) return;
                        setActiveIndex((prev) => prev + 1);
                     }}
                  >
                     <AiOutlineRight />
                  </button>
                  <LazyLoadImage
                     src={toView.images[activeIndex]}
                     alt={toView.images[activeIndex]}
                     effect="blur"
                  />
               </div>

               <div className={style.image_list}>
                  {toView.images.map((item, i) => (
                     <LazyLoadImage
                        key={i}
                        effect="blur"
                        src={item}
                        alt={item}
                        onClick={() => setActiveIndex(i)}
                     />
                  ))}
               </div>
            </div>

            <div className={style.details}>
               <div>
                  <img src={toView.profile} alt={toView.profile} />
                  <div>
                     <h2>{toView.name}</h2>
                     <span>{toView.datetime}</span>
                  </div>
               </div>

               <div data-color-mode="light" className="px-2 mt-3">
                  <div className="wmde-markdown-var"> </div>
                  <MDEditor.Markdown source={toView.descriptions} />
               </div>
            </div>
         </div>
      </DialogSlide>
   );
};

export default Carousel;
