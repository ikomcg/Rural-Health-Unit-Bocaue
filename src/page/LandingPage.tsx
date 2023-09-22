import HealthCondition from './Home/HealthCondition';
import LivingHealthy from './Home/Living_Healthy';
import Main from './Home/Main'
import News from './Home/News';
import Newsletter from './Home/Newsletter';

const LandingPage = () => {
  return (
    <>
      <Main/>
      <section className='living-healthy-page'>
        <LivingHealthy/>
      </section>
      <section className='newsletter-page'>
        <News/>
      </section>
      <section className='subcription-page'>
        <Newsletter/>
      </section>
      <section className='health-condition'>
        <HealthCondition/>
      </section>
    </>
  )
}

export default LandingPage