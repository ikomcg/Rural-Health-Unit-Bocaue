import { useState } from "react";
import style from "./Style.module.scss";
import Login from "../../page/login/Login";

const Navbar = () => {
   const [open, setOpen] = useState(false);

   return (
      <>
         <button className={style.button_sign_up} onClick={() => setOpen(true)}>
            Sign in
         </button>
         <Login open={open} setOpen={setOpen} />
      </>
   );
};

export default Navbar;
