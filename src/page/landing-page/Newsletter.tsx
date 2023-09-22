
import Subscribes from '../../components/forms/Subscribes'
import Subcription from '../../images/section-subcription/subscribe-img.jpg'
const Newsletter = () => {
  return (
        <div className='wrap flex flex-row flex-nowrap'>
            <img src={Subcription} alt="" />
            <div className='p-5' >
                <h3 className='text-4xl font-bold'>The health and wellness newsletter you’ve been looking for</h3>
                <p className='text-2xl  font-normal my-5'>Interested in exclusive interviews, must-have products, and staying updated with trending news? Wellness Wire has it all, and you don’t want to miss out.</p>
                <div className='w-3/5 flex flex-col justify-around'>
                    <Subscribes/>
                </div>
            </div>
        </div>
  )
}

export default Newsletter