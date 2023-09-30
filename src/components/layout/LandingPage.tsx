import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";

const LandingPage = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
