import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import CSwal from "../components/swal/Swal";

type ResetPasswordType = {
   email: string;
};
const ResetPassword = async ({ email }: ResetPasswordType) => {
   const auth = getAuth();
   return await sendPasswordResetEmail(auth, email)
      .then(() => {
         CSwal({
            icon: "success",
            text: "Check your email",
         });
         return true;
      })
      .catch((error) => {
         const errorCode = error.code;
         CSwal({
            icon: "error",
            text: errorCode,
         });
         return false;
      });
};

export default ResetPassword;
