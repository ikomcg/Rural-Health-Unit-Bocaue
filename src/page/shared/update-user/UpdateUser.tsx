import React, { FormEvent, SetStateAction, useState } from "react";
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
import { CreateRapidApi } from "../../../api/SMS/SendSMS";
import { RedButton } from "../../../components/button/RedButton";

type UpdateInventoryType = {
   payload: UserType;
   setPayload: React.Dispatch<SetStateAction<UserType | null>>;
};
const UpdateUser = ({ setPayload, payload }: UpdateInventoryType) => {
   const [isSaving, setIsSaving] = useState(false);
   const [isVerify, setIsVerify] = useState(payload.is_verify);
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

   const UpdateAccount = async () => {
      const _data = {
         ...payload,
         birthday: TimeStampValue(payload.birthday),
         update_at: serverTimestamp(),
      };

      const data = await updateDoc(doc(db, "users", payload.id), _data)
         .then(() => true)
         .catch((err) => {
            CSwal({
               icon: "error",
               title: err,
            });
            return null;
         });

      return data;
   };

   const SendSMSVerify = async () => {
      const _isVerify = payload.is_verify;
      if (!_isVerify || isVerify === _isVerify) return true;
      setIsVerify(_isVerify);
      await CreateRapidApi({
         endPoint: "sms/send",
         token: "bWlrb2d1cnJvYmF0OjFFOUE4MkFFLTIyQTItQ0REMS1DRUFDLTNFQjEzRjgyNjhBMg==",
         data: {
            messages: [
               {
                  from: "RHU",
                  body: `Hi ${payload.first_name} your account has been verify`,
                  to: payload.contact_no,
               },
            ],
         },
      }).then((res) => console.log(res));
      return true;
   };

   const UpdatePatient = async (e: FormEvent) => {
      e.preventDefault();
      setIsSaving(true);

      Promise.all([UpdateAccount(), SendSMSVerify()])
         .then((res) => {
            if (!res[0]) return;
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
