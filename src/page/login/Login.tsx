import React, { useContext, useState } from "react";
import style from "./Style.module.scss";
import { useNavigate } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import { SignInWithEmailAndPassword } from "../../firebase/SignIn";
import { InputPassword, Input } from "../../components/forms/Form";
import { LightBlueButton } from "../../components/button/BlueButton";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Base";
import { GetDocFireBase } from "../../firebase/Document";
import { UserProvider } from "../../context/UserProvider";
import Register from "../register/Register";
import Swal from "sweetalert2";
import ForgotPassword from "../forgot-password/Forgot-Password";

const Login = () => {
   const navigate = useNavigate();
   const { setLoading, saveCookies } = useContext(UserProvider);
   const [isRegister, setIsRegister] = useState(false);
   const [forgotPassword, setForgotPassword] = useState(false);
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
      setLoading(true, "Please wait...");
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

         if (!set_cookie) return setLoading(false);

         await updateDoc(doc(db, "users", data.user.uid), {
            status: "online",
         })
            .then(() => {
               if (set_cookie.role.includes("rural health physician")) {
                  navigate("/admin/home");
               } else if (
                  set_cookie.role.includes("patient") ||
                  set_cookie.role[0] === ""
               ) {
                  navigate("/patient/home");
               } else {
                  navigate("/health-worker/home");
               }
            })
            .catch(() => {
               Swal.fire({
                  icon: "error",
                  title: "Login Failed",
                  text: "try again!",
               });
            });
         setLoading(false);
      }

      if (!login.status) {
         setLoading(false);
         const data = JSON.parse(JSON.stringify(login.res)) as ErrorResponse;
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
      if (!user) {
         return false;
      }
      if (!user.exists()) return false;
      const full_name = `${user.data().first_name} ${user.data().middle_name} ${
         user.data().last_name
      }`;
      const cookie = {
         ...user.data(),
         full_name,
         id,
         birthday: user.data().birthday.toDate(),
         created_at: user.data().created_at.toDate(),
      } as UserType;

      saveCookies(cookie);
      return cookie;
   };

   return (
      <>
         <div className="md:shadow w-full sm:w-[70%] md:w-[60%]">
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
                     <Input
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
                     <div className="flex flex-row items-center justify-end text-sm">
                        <button
                           type="button"
                           className="text-sm text-blue"
                           onClick={() => {
                              setForgotPassword(true);
                           }}
                        >
                           Forgot Password
                        </button>
                     </div>
                     <LightBlueButton
                        className="px-4 py-2 mx-auto"
                        type="submit"
                        title="Login"
                        disabled={status.isLoading}
                     />
                  </form>
                  <div className="flex flex-row items-center justify-center text-sm mt-5">
                     <button
                        type="button"
                        className="text-sm"
                        onClick={() => {
                           setIsRegister(true);
                        }}
                     >
                        Don't have an account?{" "}
                        <span className="text-blue cursor-pointer hover:underline">
                           Register
                        </span>
                     </button>
                  </div>
               </div>
            </div>
         </div>
         {isRegister && <Register open={isRegister} setOpen={setIsRegister} />}
         {forgotPassword && (
            <ForgotPassword open={forgotPassword} setOpen={setForgotPassword} />
         )}
      </>
   );
};

export default Login;
