import React, { SetStateAction, useContext, useRef, useState } from "react";
import DialogSlide from "../../../components/mui/dialog/SlideModal";
import { AiFillCloseCircle } from "react-icons/ai";
import style from "./Style.module.scss";
import { UserProvider } from "../../../context/UserProvider";
import { BlueButton } from "../../../components/button/BlueButton";
import { CreateAnnouncementsFrb } from "../../../firebase/Announcement/Create";
import uuid from "react-uuid";
import {
   getStorage,
   ref,
   uploadBytesResumable,
   getDownloadURL,
} from "firebase/storage";
import CSwal from "../../../components/swal/Swal";

type PostType = {
   isPost: boolean;
   setIsPost: React.Dispatch<SetStateAction<boolean>>;
};
const Post = ({ isPost, setIsPost }: PostType) => {
   const { cookies } = useContext(UserProvider);
   const name = `${cookies?.first_name} ${cookies?.middle_name} ${cookies?.last_name}`;
   const profile =
      cookies?.profile !== "" ? cookies?.profile : "/image/profile.png";

   const [post, setPost] = useState<CreateAnnouncementType>({
      user: {
         name,
         profile: cookies?.profile ?? "",
         user_id: cookies?.id ?? "",
      },
      descriptions: "",
   });
   const [images, setImages] = useState<
      { id: string; url: string; link: string; status: string }[]
   >([]);

   const inputRef = useRef<HTMLInputElement>(null);

   const OnClose = () => {
      setPost({
         user: {
            name,
            profile: cookies?.profile ?? "",
            user_id: cookies?.id ?? "",
         },
         descriptions: "",
      });
      setImages([]);
      setIsPost(false);
   };

   const OnChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      if (!files || files.length === 0) return;

      for (let i = 0; i < files.length; i++) {
         const _url = URL.createObjectURL(files[i]);
         const id = uuid();
         setImages((prev) => [
            ...prev.concat({ id, url: _url, link: "", status: "uploading" }),
         ]);

         await UploadFile(files[i], id);
      }

      if (!inputRef.current) return;
      inputRef.current.value = "";
   };

   const RemoveImage = (id: string) => {
      const filterImages = images.filter((item) => item.id !== id);
      setImages(filterImages);
   };

   const UploadFile = async (file: File, id: string) => {
      const storage = getStorage();
      const metadata = {
         contentType: "image/*",
      };
      const storageRef = ref(storage, "announcement/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
         "state_changed",
         (snapshot) => {
            const progress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");

            switch (snapshot.state) {
               case "paused":
                  console.log("Upload is paused");
                  break;
               case "running":
                  console.log("Upload is running");
                  break;
            }
         },
         (error) => {
            switch (error.code) {
               case "storage/unauthorized":
                  // User doesn't have permission to access the object
                  break;
               case "storage/canceled":
                  // User canceled the upload
                  break;

               // ...

               case "storage/unknown":
                  // Unknown error occurred, inspect error.serverResponse
                  break;
            }
         },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               setImages((prev) => [
                  ...prev.map((item) => {
                     if (item.id === id) {
                        return {
                           ...item,
                           link: downloadURL,
                           status: "done",
                        };
                     }
                     return item;
                  }),
               ]);
            });
         }
      );
   };

   const CreateAnnouncement = async () => {
      const _images = images.map((item) => {
         return item.link;
      });

      const create = await CreateAnnouncementsFrb({
         data: {
            ...post,
            images: [..._images],
         },
      });

      if (!create) {
         CSwal({
            icon: "error",
            title: "Filed Post Announcement",
         });

         return;
      }
      OnClose();
   };

   const isUploading = images.some((item) => item.status === "uploading");
   return (
      <DialogSlide open={isPost} setOpen={OnClose}>
         <div className={style.create_post}>
            <div className={style.header_post}>
               <h1>Create Post</h1>
               <button onClick={OnClose}>
                  <AiFillCloseCircle />
               </button>
            </div>

            <div className={style.content}>
               <div>
                  <img src={profile} alt="" />
                  <h2>
                     {name}
                     <br />
                     <span>{cookies?.role[0]}</span>
                  </h2>
               </div>
               <textarea
                  name="descriptions"
                  value={post.descriptions}
                  id="message"
                  placeholder="Announcement..."
                  onChange={(e) => {
                     setPost((prev) => ({
                        ...prev,
                        descriptions: e.target.value,
                     }));
                  }}
               />
            </div>

            <div className={style.image_upload}>
               {images.map((item) => (
                  <div key={item.id}>
                     <div className={style.progress}></div>
                     <button onClick={() => RemoveImage(item.id)}>
                        <AiFillCloseCircle />
                     </button>
                     <img key={item.id} src={item.url} alt={item.url} />
                  </div>
               ))}
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
               <input
                  ref={inputRef}
                  type="file"
                  name="images"
                  id="image"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={OnChangeFile}
               />
            </label>
            <BlueButton
               disabled={isUploading}
               className="w-full text-center py-1"
               onClick={CreateAnnouncement}
            >
               Post
            </BlueButton>
         </div>
      </DialogSlide>
   );
};

export default Post;
