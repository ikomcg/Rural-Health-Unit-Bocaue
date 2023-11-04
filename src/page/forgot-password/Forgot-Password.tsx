import React, { FormEvent, useState } from "react";
import style from "./Style.module.scss";
import { Input } from "../../components/forms/Form";
import { LightBlueButton } from "../../components/button/BlueButton";
import DialogSlide from "../../components/mui/dialog/SlideModal";
import ResetPasswordFrb from "../../firebase/ResetPassword";

type LoginType = {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const ForgotPassword = ({ open, setOpen }: LoginType) => {
   const [email, setEmail] = useState("");

   const OnSubmit = async (e: FormEvent) => {
      e.preventDefault();

      const data = await ResetPasswordFrb({
         email,
      });

      if (!data) return;

      setOpen(false);
   };

   return (
      <>
         <DialogSlide open={open} setOpen={setOpen}>
            <div className={style.container}>
               <div className={style.header_login}>
                  <h2 className="text-2xl font-semibold">Reset Password</h2>
                  <p>Rural Health Unit</p>
                  <small>Bocaue, Bulacan</small>
               </div>

               <div className="mt-5">
                  <form className="flex flex-col gap-3" onSubmit={OnSubmit}>
                     <Input
                        value={email}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        label="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                     />
                     <LightBlueButton
                        className="px-4 py-2 mx-auto"
                        type="submit"
                        title="Submit"
                     />
                  </form>
               </div>
            </div>
         </DialogSlide>
      </>
   );
};

export default ForgotPassword;
