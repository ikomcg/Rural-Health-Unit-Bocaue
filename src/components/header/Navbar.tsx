import {useState} from 'react'
import { Link } from 'react-router-dom'
import style from './Style.module.scss'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className='flex gap-3 w-1/3'>
      <ul className='flex justify-between items-center w-full'>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/service">Service</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact-use">Contact us</Link>
        </li>
        </ul>
        <button className={style.button_sign_up}>
          Sign in
        </button>
    </div>
  )
}

export default Navbar
