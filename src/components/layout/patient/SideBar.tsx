import CloseMenu from "../../button/Menu";
import Module from "./Module";
import User from "../User";
import style from "./style.module.scss";

type SideBarType = {
   isMenu: boolean;
   setIsMenu: React.Dispatch<React.SetStateAction<boolean>>;
};
const SideBar = ({ isMenu, setIsMenu }: SideBarType) => {
   return (
      <div
         className={`flex flex-col justify-between bg-black overflow ${
            style.menu
         } ${isMenu ? style.actv_menu : style.inactv_menu}`}
      >
         <div>
            <div className={isMenu ? style.actv_header : style.inactv_header}>
               <h1 className={`text-xl`}>
                  Rural Health Unit
                  <br />
                  <small className="text-sm">Bocaue, Bulacan</small>
               </h1>
               <CloseMenu
                  disabled={!isMenu}
                  onClick={() => setIsMenu((prev) => !prev)}
               />
            </div>
            <Module isMenu={isMenu} setIsMenu={setIsMenu} />
         </div>
         <User isMenu={isMenu} />
      </div>
   );
};

export default SideBar;
