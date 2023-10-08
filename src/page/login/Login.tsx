import React, { useContext, useState } from "react";
import style from "./Style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import { SignInWithEmailAndPassword } from "../../firebase/SignIn";
import { InputPassword, InputText } from "../../components/forms/Form";
import { LightBlueButton } from "../../components/button/BlueButton";
import DialogSlide from "../../components/mui/dialog/SlideModal";
import { doc } from "firebase/firestore";
import { db } from "../../firebase/Base";
import { GetDocFireBase } from "../../firebase/Document";
import { UserProvider } from "../../context/UserProvider";

type LoginType = {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Login = ({ open, setOpen }: LoginType) => {
   const navigate = useNavigate();
   const context = useContext(UserProvider);
   const [status, setStatus] = useState({
      remember: false,
      isUserName: false,
      isPassword: false,
      invalidAccount: false,
      isLoading: false,
      alertMessage: "",
   });

   const [credential, setCredential] = useState({
      username: "",
      password: "",
   });

   const OnChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (status.invalidAccount) {
         setStatus((prev) => ({
            ...prev,
            invalidAccount: false,
         }));
      }
      setCredential((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   const LoginHandle = (e: React.FormEvent) => {
      e.preventDefault();
      if (credential.username === "" || credential.password === "") {
         setStatus((prev) => ({
            ...prev,
            isUserName: credential.username === "" ? true : false,
            isPassword: credential.password === "" ? true : false,
         }));
         return;
      }

      Login();
   };

   const Login = async () => {
      const email = credential.username;
      const password = credential.password;

      setStatus((prev) => ({
         ...prev,
         isLoading: true,
      }));

      const login = await SignInWithEmailAndPassword(email, password);

      setStatus((prev) => ({
         ...prev,
         isLoading: false,
      }));

      if (login.status) {
         const data = login.res;
         const set_cookie = await SetCookies(data.user.uid);

         setStatus((prev) => ({
            ...prev,
            isLoading: false,
         }));

         if (!set_cookie) return;

         if (set_cookie.role.includes("admin")) {
            navigate("/admin/home");
         }
      }

      if (!login.status) {
         const data = JSON.parse(JSON.stringify(login.res)) as ErrorResponse;
         console.log(data.code);
         const message = data.code.split("/")[1];

         setStatus((prev) => ({
            ...prev,
            invalidAccount: true,
            alertMessage: message,
         }));
      }
   };

   const SetCookies = async (id: string) => {
      const ref = doc(db, "users", id);

      const user = await GetDocFireBase(ref);
      console.log(user);
      if (!user) {
         return false;
      }

      if (!user.exists()) return false;

      const cookie = {
         ...user.data(),
         id,
      } as UserType;

      context.saveCookies(cookie);

      return cookie;
   };

   return (
      <DialogSlide open={open} setOpen={setOpen}>
         <div className={style.container}>
            <div className={style.header_login}>
               <h2 className="text-2xl font-semibold">Login</h2>
               <p>Rural Health Unit</p>
               <small>Bocaue, Bulacan</small>
            </div>

            {status.invalidAccount && (
               <span className={style.alert_message}>
                  <BiErrorCircle /> {status.alertMessage}
               </span>
            )}

            <div className="mt-5">
               <form onSubmit={LoginHandle} className="flex flex-col gap-3">
                  <InputText
                     onChange={OnChangeHandle}
                     value={credential.username}
                     type="text"
                     name="username"
                     id="username"
                     placeholder="Username"
                     label="UserName"
                     error={status.isUserName && credential.username === ""}
                     message="We'll never share your email with anyone else."
                  />
                  <InputPassword
                     error={status.isPassword && credential.password === ""}
                     onChange={OnChangeHandle}
                     value={credential.password}
                     id="password"
                     name="password"
                     placeholder="Password"
                     label="Password"
                  />
                  <div className="flex flex-row justify-end">
                     <Link to="" className="text-blue hover:underline">
                        Forgot Password?
                     </Link>
                  </div>
                  <LightBlueButton
                     className="px-4 py-2"
                     type="submit"
                     title="Login"
                     disabled={status.isLoading}
                  />
               </form>
            </div>
         </div>
      </DialogSlide>
   );
};

export default Login;