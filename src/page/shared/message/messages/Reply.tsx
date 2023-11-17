import { useState, useContext, FormEvent, useRef } from "react";
import { UserProvider } from "../../../../context/UserProvider";
import { RiSendPlaneFill } from "react-icons/ri";
import { UpdateConversation } from "../../../../firebase/message/message";
import uuid from "react-uuid";
import {
   getDownloadURL,
   getStorage,
   ref,
   uploadBytesResumable,
} from "firebase/storage";
import { AiFillCloseCircle } from "react-icons/ai";
import style from "./Style.module.scss";
import {
   ValidDocsListType,
   ValidFileTypeListToEdit,
   ValidImageTypeListToEdit,
} from "../../../../utils/FileValidator";
import CSwal from "../../../../components/swal/Swal";
import { CreateRapidApi } from "../../../../api/SMS/SendSMS";

type ReplyType = {
   activeInbox: Inbox;
};

const Reply = ({ activeInbox }: ReplyType) => {
   const { cookies } = useContext(UserProvider);
   const [myMessage, setMyMessage] = useState("");
   const [files, setFiles] = useState<
      {
         id: string;
         name: string;
         url: string;
         link: string;
         status: string;
         type: string;
      }[]
   >([]);
   const inputRef = useRef<HTMLInputElement>(null);

   const Reply = async (e: FormEvent) => {
      e.preventDefault();
      if (
         !cookies ||
         (myMessage.trim() === "" && files.length === 0) ||
         isUploading
      )
         return;
      setMyMessage("");

      await UpdateConversation({
         message: myMessage,
         files: [
            ...files.map((item) => ({
               url: item.link,
               type: item.type,
               name: item.name,
            })),
         ],
         convoID: activeInbox.id,
         from_id: cookies.id,
      });

      let phone;

      if (activeInbox.from_user.contact_no === cookies.contact_no) {
         phone = activeInbox.to_user.contact_no;
      } else {
         phone = activeInbox.from_user.contact_no;
      }

      await CreateRapidApi({
         endPoint: "sms/send",
         token: "Y291cnNlaGVyN0BnbWFpbC5jb206OTE0QzY4M0YtM0NCMy0xRkY0LTBFRUQtRTMxMUZENEFBQkM2",
         data: {
            messages: [
               {
                  from: "RHU",
                  body: `${cookies.full_name} sent a message`,
                  to: phone,
               },
            ],
         },
      });
      setFiles([]);
   };

   const OnChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      if (!files || files.length === 0) return;
      for (let i = 0; i < files.length; i++) {
         if (
            !ValidFileTypeListToEdit.includes(files[i].type) &&
            !ValidImageTypeListToEdit.includes(files[i].type) &&
            !ValidDocsListType.includes(files[i].type)
         ) {
            CSwal({
               icon: "info",
               title: "Invalid File",
            });
            return;
         }

         const _url = URL.createObjectURL(files[i]);
         const id = uuid();

         setFiles((prev) => [
            ...prev.concat({
               id,
               url: _url,
               name: files[i].name,
               link: "",
               status: "uploading",
               type: files[i].type,
            }),
         ]);

         await UploadFile(files[i], id);
      }

      if (!inputRef.current) return;
      inputRef.current.value = "";
   };

   const UploadFile = async (file: File, id: string) => {
      const storage = getStorage();
      const storageRef = ref(storage, "message/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
         "state_changed",
         (snapshot) => {
            switch (snapshot.state) {
               case "paused":
                  "Upload is paused";
                  break;
               case "running":
                  "Upload is running";
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
               setFiles((prev) => [
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

   const RemoveImage = (id: string) => {
      const filterImages = files.filter((item) => item.id !== id);
      setFiles(filterImages);
   };
   const isUploading = files.some((item) => item.status === "uploading");
   return (
      <>
         <div className={style.image_upload}>
            {files.map((item) => {
               if (item.type.includes("video")) {
                  return (
                     <div key={item.id}>
                        <div className={style.progress}></div>
                        <button onClick={() => RemoveImage(item.id)}>
                           <AiFillCloseCircle />
                        </button>
                        <video width="100" height="100">
                           <source src={item.url} type="video/mp4" />
                        </video>
                     </div>
                  );
               } else if (item.type.includes("image")) {
                  return (
                     <div key={item.id}>
                        <div className={style.progress}></div>
                        <button onClick={() => RemoveImage(item.id)}>
                           <AiFillCloseCircle />
                        </button>
                        <img key={item.id} src={item.url} alt={item.url} />
                     </div>
                  );
               } else {
                  return (
                     <div key={item.id} className={style.docs_file}>
                        <div className={style.progress}></div>
                        <button onClick={() => RemoveImage(item.id)}>
                           <AiFillCloseCircle />
                        </button>
                        <a href={item.url} target="_blank">
                           {item.name}
                        </a>
                     </div>
                  );
               }
            })}
         </div>
         <form
            className="flex flex-row items-center mb-3 mt-2 pr-2"
            onSubmit={Reply}
         >
            <input
               ref={inputRef}
               type="file"
               accept={`.mp4, image/*, ${ValidDocsListType.toLocaleString()}`}
               id="file_attachment"
               className="hidden"
               multiple
               onChange={OnChangeFile}
            />

            <label htmlFor="file_attachment" className="cursor-pointer ">
               <img
                  width="35"
                  height="35"
                  src="https://img.icons8.com/fluency/48/image--v1.png"
                  alt="image--v1"
               />
            </label>

            <input
               className="outline-none bg-gray-200 w-full px-3 py-2 rounded-lg ml-2"
               type="text"
               placeholder="Aa"
               value={myMessage}
               onChange={(e) => setMyMessage(e.target.value)}
            />
            <button type="submit" className="cursor-pointer ml-2" title="send">
               <RiSendPlaneFill className={`text-2xl text-blue`} />
            </button>
         </form>
      </>
   );
};

export default Reply;
