import Navbar from "./Navbar";
import style from "./Style.module.scss";

const Header = () => {
  return (
    <header className={style.header_}>
      <div className="wrap flex justify-between items-center">
        <div>
          <h1>RURAL HEALTH UNIT</h1>
          <span>Bocaue Bulacan</span>
        </div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
