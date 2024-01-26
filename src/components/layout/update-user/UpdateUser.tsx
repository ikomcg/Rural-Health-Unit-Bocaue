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
import ChangePassword from "./PrivacySecurity/ChangePassword";
import Account from "./PrivacySecurity/Account";
import { deleteUser, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { SignOutFireBase } from "../../../firebase/SignOut";
import { RedButton } from "../../button/RedButton";

type UpdateInventoryType = {
   payload: UserType;
   setPayload: React.Dispatch<SetStateAction<UserType | null>>;
};
const UpdateUser = ({ setPayload, payload }: UpdateInventoryType) => {
   const inputRef = useRef<HTMLInputElement>(null);
   const [isSaving, setIsSaving] = useState(false);
   const navigate = useNavigate();
   const OnClose = () => {
      if (isSaving) return;
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

   const UpdateInformation = async () => {
      const data = {
         ...payload,
         created_at: TimeStampValue(payload.created_at),
         birthday: TimeStampValue(payload.birthday),
         update_at: serverTimestamp(),
      };

      console.log(data);

      return await updateDoc(doc(db, "users", payload.id), data)
         .then(() => true)
         .catch((err) => {
            CSwal({
               icon: "error",
               title: err,
            });

            return false;
         });
   };

   const DeleteAccount = async () => {
      const isDelete = payload.account_status === "delete";
      if (!isDelete) return true;

      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return false;

      return await deleteUser(user)
         .then(async () => {
            await SignOutFireBase();
            navigate("/");
            CSwal({
               icon: "success",
               title: "Account Deleted",
            });
            return true;
         })
         .catch((err) => {
            CSwal({
               icon: "error",
               title: err,
            });
            return false;
         });
   };

   const UpdateAccount = (e: FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      const isDelete = payload.account_status === "delete";

      Promise.all([UpdateInformation(), DeleteAccount()])
         .then((res) => {
            if (!res[0] || isDelete) return;

            OnClose();
            CSwal({
               icon: "success",
               title: "Update Successfully",
            });
         })
         .catch((error) => {
            CSwal({
               icon: "error",
               title: error,
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
            className="flex flex-col flex-wrap mb-3 pt-3"
            onSubmit={UpdateAccount}
         >
            <div className={style.header}>
               <h1>Rural Health Unit </h1>
               <h2>Bocaue, Bulacan</h2>
            </div>
            <PersonalInformation
               payload={payload}
               HandleOnChange={OnChangeHandle}
               OnChangeFile={OnChangeFile}
            />
            <ChangePassword />
            <Account payload={payload} setPayload={setPayload} />
            <div className="mx-auto">
               <BlueButton
                  className="mr-1 mt-5 py-1"
                  type="submit"
                  disabled={isSaving}
               >
                  Save
               </BlueButton>
               <RedButton
                  className="ml-1o mt-5 py-1"
                  type="button"
                  onClick={OnClose}
               >
                  Close
               </RedButton>
            </div>
         </form>
      </DialogSlide>
   );
};

export default UpdateUser;
