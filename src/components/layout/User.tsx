import { IoExitOutline } from "react-icons/io5";
import style from "./style.module.scss";
import { AiOutlineEdit } from "react-icons/ai";
import { useContext } from "react";
import { UserProvider } from "../../context/UserProvider";
import { SignOutFireBase } from "../../firebase/SignOut";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Base";

type UserType = {
   isMenu: boolean;
};
const User = ({ isMenu }: UserType) => {
   const { cookies, deleteCookies, setLoading } = useContext(UserProvider);

   const profile =
      cookies?.profile !== "" ? cookies?.profile : "/image/profile.png";
   const navigate = useNavigate();
   const LogOut = async () => {
      setLoading(true, "Logout...");
      const logout = await SignOutFireBase();

      if (!logout || !cookies) {
         setLoading(false, "Logout...");
         Swal.fire({
            icon: "error",
            text: "OOPS! Something went wrong",
         });
         return;
      }
      await updateDoc(doc(db, "users", cookies.id), {
         status: "offline",
      })
         .then(() => {
            deleteCookies();
            navigate("/");
         })
         .catch(() => {
            Swal.fire({
               icon: "error",
               title: "Logout Failed",
               text: "try again!",
            });
         });
      setLoading(false, "Logout...");
   };

   return (
      <div
         className={`${style.user_nav} ${
            isMenu ? style.actv_ftr : style.in_actv_ftr
         }`}
      >
         <img src={profile} alt="" />
         <h2>
            {cookies?.last_name}, {cookies?.first_name} {cookies?.middle_name}
            <span>
               {cookies?.role[0]}{" "}
               <button>
                  <AiOutlineEdit />
               </button>
            </span>
         </h2>

         <button onClick={LogOut}>
            <IoExitOutline />
         </button>
      </div>
   );
};

export default User;
