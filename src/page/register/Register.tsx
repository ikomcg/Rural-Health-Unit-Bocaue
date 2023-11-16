import { FormEvent, SetStateAction, useState } from "react";
import DialogSlide from "../../components/mui/dialog/SlideModal";
import style from "./style.module.scss";
import PersonalInformation from "./PersonalInformation";
import { BlueButton } from "../../components/button/BlueButton";
import { sendSignInLinkToEmail, getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import { Input, InputPassword } from "../../components/forms/Form";
import {
   Backdrop,
   Checkbox,
   CircularProgress,
   FormControlLabel,
} from "@mui/material";
import {
   getDownloadURL,
   getStorage,
   ref,
   uploadBytesResumable,
} from "firebase/storage";
import DataPrivacy from "./Data-Privacy";

type RegisterType = {
   open: boolean;
   setOpen: React.Dispatch<SetStateAction<boolean>>;
};

export type FilesType = {
   id: string;
   document: string;
   name: string;
   file: File;
};
const initialPayload: Register = {
   last_name: "",
   first_name: "",
   middle_name: "",
   age: "",
   gender: "",
   contact_no: "",
   email: "",
   birthday: "",
   marital_status: "",
   past_medical: "",
   vital_sign: "",
   diagnosis: "",
   treatment: "",
   birth_certificate: "",
   physical_examination: "",
   profile: "",
   address: "",
   barangay: "",
};
const Register = ({ open, setOpen }: RegisterType) => {
   const auth = getAuth();
   // const [filesInformation, setFilesInformation] = useState<FilesType[]>([]);
   const [password, setPassword] = useState("");
   const [payload, setPayload] = useState<Register>(initialPayload);
   const [page, setPage] = useState(1);
   const [isSaving, setIsSaving] = useState(false);
   const [dataPrivacy, setDataPrivacy] = useState(false);
   const HandleOnChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
      const { name, value } = e.target;

      setPayload((prev) => ({ ...prev, [name]: value.toLocaleUpperCase() }));
   };

   const OnChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      if (!files || files.length === 0) return;

      const _url = URL.createObjectURL(files[0]);
      setPayload((prev) => ({ ...prev, profile: _url }));
      await UploadFile(files[0]);
   };

   const UploadFile = async (file: File) => {
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
               setPayload((prev) => ({ ...prev, profile: downloadURL }));
            });
         }
      );
   };

   const RegisterSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      const email = payload.email;
      const actionCodeSettings = {
         url: window.location.href,
         handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
         .then(() => {
            setOpen(false);
            window.localStorage.setItem("emailForSignIn", email);
            window.localStorage.setItem("payload", JSON.stringify(payload));
            Swal.fire({
               icon: "success",
               title: "Check you email",
               text: "Confirm your Email address",
            });
         })
         .catch((error) => {
            setOpen(false);
            Swal.fire({
               icon: "error",
               title: error.code,
            });
         });
   };

   return (
      <>
         <DialogSlide
            fullWidth={true}
            maxWidth={page === 1 ? "xs" : "lg"}
            open={open}
            setOpen={setOpen}
         >
            <div className={style.header}>
               <h1>Rural Health Unit</h1>
               <h2>ocaue, Bulacan</h2>
               <span className="text-blue mx-auto">Step {page}/2</span>
            </div>
            {page === 1 ? (
               <form
                  className="flex flex-col gap-1 mx-3 mb-3"
                  onSubmit={(e) => {
                     e.preventDefault();
                     if (payload.email.trim() && password.trim()) {
                        setPage(2);
                     }
                  }}
               >
                  <div>
                     <Input
                        value={payload.email}
                        onChange={HandleOnChange}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        label="Email"
                        message="We'll never share your email with anyone else."
                        required
                     />
                     <InputPassword
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        placeholder="Password"
                        label="Password"
                        required
                     />
                  </div>
                  <div className="flex flex-row items-center">
                     <FormControlLabel
                        required
                        style={{
                           marginRight: "3px",
                        }}
                        control={<Checkbox />}
                        label="I understand and agree with the"
                     />
                     <button
                        type="button"
                        className="text-blue hover:underline"
                        onClick={() => setDataPrivacy(true)}
                     >
                        Privacy Policy
                     </button>
                  </div>

                  <BlueButton className="mx-auto py-2" type="submit">
                     Next
                  </BlueButton>
               </form>
            ) : (
               <form
                  className="flex flex-col"
                  id="register"
                  onSubmit={RegisterSubmit}
               >
                  <PersonalInformation
                     payload={payload}
                     HandleOnChange={HandleOnChange}
                     OnChangeFile={OnChangeFile}
                  />

                  <div className="flex flex-row gap-3 justify-end items-center m-3 mt-5">
                     <BlueButton
                        className="py-2"
                        type="button"
                        onClick={() => setPage(1)}
                     >
                        Prev
                     </BlueButton>
                     <BlueButton className="py-2" type="submit">
                        Register
                     </BlueButton>
                  </div>
               </form>
            )}
         </DialogSlide>
         <DataPrivacy open={dataPrivacy} setOpen={setDataPrivacy} />

         <Backdrop
            sx={{
               color: "#fff",
               zIndex: (theme) => theme.zIndex.drawer + 99999,
            }}
            open={isSaving}
         >
            <CircularProgress color="inherit" />
         </Backdrop>
      </>
   );
};

export default Register;
