import React, { SetStateAction, useContext } from "react";
import DialogSlide from "../../components/mui/dialog/SlideModal";
import { AiFillCloseCircle } from "react-icons/ai";
import style from "./Style.module.scss";
import { UserProvider } from "../../context/UserProvider";
import { BlueButton } from "../../components/button/BlueButton";
type PostType = {
   isPost: boolean;
   setIsPost: React.Dispatch<SetStateAction<boolean>>;
};
const Post = ({ isPost, setIsPost }: PostType) => {
   const { cookies } = useContext(UserProvider);

   const profile =
      cookies?.profile !== "" ? cookies?.profile : "/image/profile.png";
   return (
      <DialogSlide open={isPost} setOpen={setIsPost}>
         <div className={style.create_post}>
            <div className={style.header_post}>
               <h1>Create Post</h1>
               <button>
                  <AiFillCloseCircle />
               </button>
            </div>

            <div className={style.content}>
               <div>
                  <img src={profile} alt="" />
                  <h2>
                     {cookies?.first_name} {cookies?.middle_name}{" "}
                     {cookies?.last_name}
                     <br />
                     <span>{cookies?.role[0]}</span>
                  </h2>
               </div>
               <textarea
                  name="message"
                  id="message"
                  placeholder="Announcement..."
               />
            </div>
            <label className={style.add_to_post} htmlFor="image">
               <span>Add to your post</span>
               <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/fluency/48/image--v1.png"
                  alt="image--v1"
               />
               Image
               <input type="file" name="images" id="image" className="hidden"/>
            </label>
            <BlueButton className="w-full text-center py-1">Post</BlueButton>
         </div>
      </DialogSlide>
   );
};

export default Post;
