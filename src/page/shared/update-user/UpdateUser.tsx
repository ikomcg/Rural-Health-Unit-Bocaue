import React, { FormEvent, SetStateAction, useRef, useState } from "react";
import { BlueButton } from "../../../components/button/BlueButton";
import DialogSlide from "../../../components/mui/dialog/SlideModal";
import PersonalInformation from "./PersonalInformation";
import style from "./style.module.scss";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/Base";
import CSwal from "../../../components/swal/Swal";
import { TimeStampValue } from "../../../shared/TimeStamp";
import {
   getDownloadURL,
   getStorage,
   ref,
   uploadBytesResumable,
} from "firebase/storage";

type UpdateInventoryType = {
   payload: UserType;
   setPayload: React.Dispatch<SetStateAction<UserType | null>>;
};
const UpdateUser = ({ setPayload, payload }: UpdateInventoryType) => {
   const inputRef = useRef<HTMLInputElement>(null);
   const [isSaving, setIsSaving] = useState(false);

   const OnClose = () => {
      setPayload(null);
   };

   const OnChangeHandle = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
      const { name, value } = e.target;

      setPayload((prev) => (prev ? { ...prev, [name]: value } : null));
   };

   const OnChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      if (!files || files.length === 0) return;

      const _url = URL.createObjectURL(files[0]);
      setPayload((prev) => (prev ? { ...prev, profile: _url } : null));
      await UploadFile(files[0]);

      if (!inputRef.current) return;
      inputRef.current.value = "";
   };

   const UploadFile = async (file: File) => {
      setIsSaving(true);
      const storage = getStorage();
      const metadata = {
         contentType: "image/*",
      };
      const storageRef = ref(storage, "profile/" + file.name);
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
            setIsSaving(false);
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
            setIsSaving(false);
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               setPayload((prev) =>
                  prev ? { ...prev, profile: downloadURL } : null
               );
            });
         }
      );
   };

   const UpdatePatient = async (e: FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      const data = {
         ...payload,
         birthday: TimeStampValue(payload.birthday),
         update_at: serverTimestamp(),
      };

      await updateDoc(doc(db, "users", payload.id), data)
         .then(() => {
            OnClose();
            CSwal({
               icon: "success",
               title: "Update Successfully",
            });
         })
         .catch((err) => {
            CSwal({
               icon: "error",
               title: err,
            });
         })
         .finally(() => {
            setIsSaving(false);
         });
   };

   return (
      <DialogSlide
         fullWidth={true}
         maxWidth="lg"
         open={payload !== null}
         setOpen={OnClose}
         tabIndex={1}
      >
         <form
            className="flex flex-row flex-wrap mb-3 pt-3"
            onSubmit={UpdatePatient}
         >
            <div className={style.header}>
               <h1>Rural Health Unit Bocaue, Bulacan</h1>
               <h2>Patient Card</h2>
            </div>
            <PersonalInformation
               payload={payload}
               setPayload={setPayload}
               HandleOnChange={OnChangeHandle}
               OnChangeFile={OnChangeFile}
            />
            <hr className="border-1 border-blue my-3" />
            <BlueButton
               className="mx-auto mt-5 py-1"
               type="submit"
               disabled={isSaving}
            >
               Save
            </BlueButton>
         </form>
      </DialogSlide>
   );
};

export default UpdateUser;
