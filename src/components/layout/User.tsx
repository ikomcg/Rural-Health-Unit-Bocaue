import { IoExitOutline } from "react-icons/io5";
import style from "./style.module.scss";
import { AiOutlineEdit } from "react-icons/ai";
import { useContext } from "react";
import { UserProvider } from "../../context/UserProvider";
import { SignOutFireBase } from "../../firebase/SignOut";
import { useNavigate } from "react-router-dom";

const User = () => {
   const { cookies, deleteCookies } = useContext(UserProvider);

   const profile = cookies?.profile !== "" ? cookies?.profile : "/image/profile.png"
   const navigate = useNavigate();
   const LogOut = async () => {
      const logout = await SignOutFireBase();

      if (!logout) {
         // Swal.fire({
         //    icon: "error",
         //    text: "OOPS! Something went wrong",
         // });
         return;
      }

      deleteCookies();
      navigate("/");
   };

   return (
      <div className={style.user_nav}>
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
