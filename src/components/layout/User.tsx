import { IoExitOutline } from "react-icons/io5";
import style from "./style.module.scss";
import { AiOutlineEdit } from "react-icons/ai";

const User = () => {
   return (
      <div className={style.user_nav}>
         <img src="/image/profile.png" alt="" />
         <h2>
            Miko Gurrobat
            <span>
               admin{" "}
               <button>
                  <AiOutlineEdit />
               </button>
            </span>
         </h2>

         <button>
            <IoExitOutline />
         </button>
      </div>
   );
};

export default User;
