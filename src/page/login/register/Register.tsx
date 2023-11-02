import { FormEvent, SetStateAction, useState } from "react";
import DialogSlide from "../../../components/mui/dialog/SlideModal";
import style from "./style.module.scss";
import PersonalInformation from "./PersonalInformation";
// import HealtInformation from "./HealtInformation";
import { BlueButton } from "../../../components/button/BlueButton";
import { sendSignInLinkToEmail, getAuth } from "firebase/auth";
import Swal from "sweetalert2";
// import uuid from "react-uuid";
import { Input, InputPassword } from "../../../components/forms/Form";
import { Backdrop, CircularProgress } from "@mui/material";

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
};
const Register = ({ open, setOpen }: RegisterType) => {
   const auth = getAuth();
   // const [filesInformation, setFilesInformation] = useState<FilesType[]>([]);
   const [password, setPassword] = useState("");
   const [payload, setPayload] = useState<Register>(initialPayload);
   const [page, setPage] = useState(1);
   const [isLoading, setIsLoading] = useState(false);
   const HandleOnChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
      const { name, value } = e.target;

      setPayload((prev) => ({ ...prev, [name]: value }));
   };

   // const OnChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
   //    const { files, name } = e.target;

   //    if (!files || files.length === 0) return;
   //    const isChange = filesInformation?.find((item) => item.name === name);
   //    console.log(files);
   //    if (isChange) {
   //       return setFilesInformation((prev) => [
   //          ...prev.map((item) => {
   //             if (item.name === name) {
   //                return {
   //                   ...item,
   //                   file: files[0],
   //                };
   //             }
   //             return item;
   //          }),
   //       ]);
   //    }

   //    setFilesInformation((prev) => [
   //       ...prev.concat({ id: uuid(), document: "", name, file: files[0] }),
   //    ]);
   // };

   const RegisterSubmit = async (e: FormEvent) => {
      e.preventDefault();

      const email = payload.email;
      const actionCodeSettings = {
         url: window.location.href,
         handleCodeInApp: true,
      };

      setIsLoading(true);
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
               <h1>Rural Health Unit Bocaue, Bulacan</h1>
               <h2>Patient Card</h2>
               <span className="text-blue mx-auto">Step {page}/2</span>
            </div>
            {page === 1 ? (
               <form
                  className="flex flex-col gap-3 mx-5 mb-5"
                  onSubmit={(e) => {
                     e.preventDefault();
                     if (payload.email.trim() && password.trim()) {
                        setPage(2);
                     }
                  }}
               >
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
                     password={password}
                     setPassword={setPassword}
                  />

                  <div className="flex flex-row gap-3 justify-end items-center m-3 mt-5">
                     <BlueButton
                        className="w-[8%] py-2"
                        type="button"
                        onClick={() => setPage(1)}
                     >
                        Prev
                     </BlueButton>
                     <BlueButton className="w-[8%] py-2" type="submit">
                        Register
                     </BlueButton>
                  </div>
               </form>
            )}
         </DialogSlide>

         <Backdrop
            sx={{
               color: "#fff",
               zIndex: (theme) => theme.zIndex.drawer + 99999,
            }}
            open={isLoading}
         >
            <CircularProgress color="inherit" />
         </Backdrop>
      </>
   );
};

export default Register;
