
import HealthCondition from "./landing-page/HealthCondition";
import LivingHealthy from "./landing-page/Living_Healthy";
import Main from "./landing-page/Main";
import News from "./landing-page/News";
import Newsletter from "./landing-page/Newsletter";


const LandingPage = () => {
  

   return (
      <>
         <Main />
         <section className="living-healthy-page">
            <LivingHealthy />
         </section>
         <section className="newsletter-page">
            <News />
         </section>
         <section className="subcription-page">
            <Newsletter />
         </section>
         <section className="health-condition">
            <HealthCondition />
         </section>
      </>
   );
};

export default LandingPage;
