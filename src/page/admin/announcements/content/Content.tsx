import MDEditor from "@uiw/react-md-editor";
import style from "../Style.module.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./GridStyle.scss";
import moment from "moment";
import BasicMenu from "../announcement-list/Menu";
import React, { useContext } from "react";
import { UserProvider } from "../../../../context/UserProvider";
import ManagePost from "../manage-post/ManageAnnouncement";
import CSwal, { JSXCSwal } from "../../../../components/swal/Swal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type ContentType = {
   item: AnnouncementType;
   OnDeletePost: (id: string) => Promise<boolean>;
} & React.ComponentProps<"div">;

const Content = ({
   item,
   OnDeletePost,
   onClick,
   ...cleanProps
}: ContentType) => {
   const { cookies } = useContext(UserProvider);
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const image_len = item.images.length > 3 ? "4" : item.images.length;

   const OnDelete = async () => {
      const swal = await CSwal({
         icon: "info",
         title: "Delete Announcement",
         text: "Are you sure you want to delete Post?",
         showCancelButton: true,
      });

      if (!swal) return;

      await OnDeletePost(item.id);
      setAnchorEl(null);
   };

   const UpdateAnnouncement = (id: string, item: AnnouncementType) => {
      if (!cookies) return;

      JSXCSwal({
         children: (
            <ManagePost cookies={cookies} announcementId={id} payload={item} />
         ),
         showConfirmButton: false,
      });
      setAnchorEl(null);
   };

   return (
      <div
         className={`flex flex-col w-[75%] border border-1 border-gray-400 rounded-lg pt-5 overflow-hidden mb-3 py-10`}
         {...cleanProps}
      >
         <div className="flex items-center gap-2 px-3 h-[10%] ">
            <img className={`${style.profile_img}`} src={item.user.profile} />
            <div className="flex flex-col">
               <h1>{item.user.full_name}</h1>
               <span className="text-gray-600 text-sm">
                  {moment(item.created_at.toISOString())
                     .utcOffset(8)
                     .format("LLL")}
               </span>
            </div>
            {cookies?.id === item.user.id && (
               <BasicMenu
                  OnDeletePost={OnDelete}
                  open={open}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  OnEditPost={() => UpdateAnnouncement(item.id, item)}
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
                  return (
                     <LazyLoadImage
                        key={i}
                        src={item}
                        alt={item}
                        effect="blur"
                        onClick={onClick}
                     />
                  );
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
