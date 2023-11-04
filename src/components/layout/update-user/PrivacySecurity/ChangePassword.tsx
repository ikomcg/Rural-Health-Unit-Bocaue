import style from "./style.module.scss";
import { BlueButton } from "../../../button/BlueButton";
import { useContext } from "react";
import { UserProvider } from "../../../../context/UserProvider";
import ResetPassword from "../../../../firebase/ResetPassword";

const ChangePassword = () => {
   const { cookies } = useContext(UserProvider);

   const OnSendResetPassword = async () => {
      if (!cookies) return;

      const { email } = cookies;
      return await ResetPassword({
         email,
      });
   };

   return (
      <div className="px-3 mt-5 mb-3">
         <h3 className="text-xl mb-3 text-blue font-semibold">
            Privacy and Security
         </h3>

         <div className={style.change_password_container}>
            <h4 className="mb-2 font-semibold">Reset Password</h4>
            <div>
               <BlueButton
                  type="button"
                  className="py-2 text-sm"
                  onClick={OnSendResetPassword}
               >
                  Send Password Reset
               </BlueButton>
               <br />
               <span className="text-xs text-gray-400">
                  Send a password reset to your email{" "}
               </span>
            </div>
         </div>
      </div>
   );
};

export default ChangePassword;
