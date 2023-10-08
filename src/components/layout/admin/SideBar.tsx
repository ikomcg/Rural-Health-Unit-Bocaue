import CloseMenu from "../../button/Menu";
import Module from "./Module";
import User from "../User";
import { useState } from "react";

const SideBar = () => {
   const [isMenu, setIsMenu] = useState(false);
   return (
      <div className="flex flex-col justify-between bg-black w-[20%]">
         <div>
            <div className="flex  justify-between  items-start text-white p-4">
               <h1 className="text-xl">
                  Rural Health Unit
                  <br />
                  <small className="text-sm">Bocaue, Bulacan</small>
               </h1>
               <CloseMenu
                  disabled={isMenu}
                  onClick={() => setIsMenu((prev) => !prev)}
               />
            </div>
            <Module />
         </div>
         <User />
      </div>
   );
};

export default SideBar;
