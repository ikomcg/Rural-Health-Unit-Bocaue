import LeftFooter from './LeftFooter'
import RightFooter from './RightFooter'

const Footer = () => {
  return (
      <footer className='bg-light-yellow mt-200'>
        <div className="wrap">
          <div className="flex flex-row flex-wrap py-14">
            <LeftFooter/>
            <RightFooter/>
          </div>
        </div>
        <div className='bg-light-black text-center py-3'>
          <span className='text-white text-xl font-normal'>All right Reserved | 2023</span>
        </div>
      </footer>
  )
}

export default Footer