import React, { SetStateAction, useRef, useState } from "react";
import DialogSlide from "../../../../../components/mui/dialog/SlideModal";
import { AiFillCloseCircle } from "react-icons/ai";
import style from "./style.module.scss";
import { BlueButton } from "../../../../../components/button/BlueButton";
import { CreateServiceFrb } from "../../../../../firebase/Service/Create";
import Swal from "sweetalert2";

import {
   getStorage,
   ref,
   uploadBytesResumable,
   getDownloadURL,
} from "firebase/storage";

type PostType = {
   isPost: boolean;
   setIsPost: React.Dispatch<SetStateAction<boolean>>;
};
const NewService = ({ isPost, setIsPost }: PostType) => {
   const [title, setTitle] = useState("");
   const [isCreate, setIsCreate] = useState(false);
   const [image, setImage] = useState<{
      url: string;
      link: string;
      status: string;
   }>({ url: "", link: "", status: "" });

   const inputRef = useRef<HTMLInputElement>(null);

   const OnClose = () => {
      setTitle("");
      setImage({ url: "", link: "", status: "" });
      setIsPost(false);
   };

   const UploadFile = async (file: File) => {
      const storage = getStorage();
      const metadata = {
         contentType: "image/*",
      };
      const storageRef = ref(storage, "service/" + file.name);
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
               setImage((prev) => ({
                  ...prev,
                  link: downloadURL,
                  status: "done",
               }));
            });
         }
      );
   };
   const OnChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      if (!files || files.length === 0) return;
      const url = URL.createObjectURL(files[0]);
      setImage((prev) => ({ ...prev, url, status: "uploading" }));
      await UploadFile(files[0]);

      if (!inputRef.current) return;
      inputRef.current.value = "";
   };

   const RemoveImage = () => {
      setImage({ url: "", link: "", status: "" });
   };

   const CreateService = async () => {
      setIsCreate(true);
      const _image =
         image.link === ""
            ? "https://firebasestorage.googleapis.com/v0/b/rural-health-unit-72880.appspot.com/o/medecines%2F22.webp?alt=media&token=b87d6565-432c-44c4-b0c6-2c88bb556600&_gl=1*1xh88mo*_ga*MzM1MjM3ODExLjE2ODk0MDg3NjA.*_ga_CW55HF8NVT*MTY5NzI0NDY0OC45MC4xLjE2OTcyNDc3OTMuNDUuMC4w"
            : image.link;
      const create = await CreateServiceFrb({
         data: {
            name: title,
            image: _image,
         },
      });
      setIsCreate(false);
      if (!create) {
         Swal.fire({
            icon: "error",
            title: "Filed Create Service",
         });

         return;
      }
      OnClose();
   };

   const isUploading = image.status === "uploading";

   return (
      <DialogSlide open={isPost} setOpen={OnClose}>
         <div className={style.create_post}>
            <div className={style.header_post}>
               <h1>Add Service</h1>
               <button onClick={OnClose}>
                  <AiFillCloseCircle />
               </button>
            </div>

            <div className={style.content}>
               <input
                  value={title}
                  placeholder="Name..."
                  onChange={(e) => {
                     setTitle(e.target.value);
                  }}
               />
            </div>
            {image.url !== "" && (
               <div className={style.image_upload}>
                  <div>
                     <div className={style.progress}></div>
                     <button onClick={RemoveImage}>
                        <AiFillCloseCircle />
                     </button>
                     <img src={image.url} alt={image.url} />
                  </div>
               </div>
            )}

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
                  onChange={OnChangeFile}
               />
            </label>
            <BlueButton
               disabled={isUploading || isCreate}
               className="w-full text-center py-1"
               onClick={CreateService}
            >
               Create
            </BlueButton>
         </div>
      </DialogSlide>
   );
};

export default NewService;
