import MDEditor from "@uiw/react-md-editor";
import style from "./Style.module.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./GridStyle.scss";
import moment from "moment";
import BasicMenu from "./Menu";
import React, { useContext } from "react";
import { UserProvider } from "../../context/UserProvider";

type ContentType = {
   item: AnnouncementType;
   OnDeletePost: (id: string) => Promise<boolean>;
};
const Content = ({ item, OnDeletePost }: ContentType) => {
   const { cookies } = useContext(UserProvider);
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const image_len = item.images.length > 3 ? "4" : item.images.length;

   const OnDelete = async () => {
      await OnDeletePost(item.id);
      setAnchorEl(null);
   };
   return (
      <div
         className={`flex flex-col w-[60%] border border-1 border-gray-400 rounded-lg pt-5 overflow-hidden mb-3 py-10`}
      >
         <div className="flex items-center gap-2 px-3 h-[10%] ">
            <img className={`${style.profile_img}`} src={item.user.profile} />
            <div className="flex flex-col">
               <h1>{item.user.name}</h1>
               <span className="text-gray-600 text-sm">
                  {moment(item.created_at.toISOString())
                     .utcOffset(8)
                     .format("LLL")}
               </span>
            </div>
            {cookies?.id === item.user.user_id && (
               <BasicMenu
                  OnDeletePost={OnDelete}
                  open={open}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
               />
            )}
         </div>

         <div className="flex flex-col h-[90%]">
            <div data-color-mode="light" className="px-5 mt-3">
               <div className="wmde-markdown-var"> </div>
               <MDEditor.Markdown source={item.descriptions} />
            </div>
            <div
               className={`${style.news_image} relative w-[100%] mx-auto grid_container_${image_len}`}
            >
               {item.images.map((item, i) => {
                  if (i > 3) return;
                  return <img key={i} src={item} loading="lazy" />;
               })}

               {item.images.length > 4 && (
                  <div className="absolute bottom-0 right-1 bg-[rgba(0,0,0,.4)] h-[200px] w-[49%] flex items-center justify-center">
                     <h1 className="text-white text-3xl">
                        +{item.images.length - 3}
                     </h1>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default Content;
