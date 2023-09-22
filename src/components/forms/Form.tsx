import React, {useState} from 'react'
import {AiOutlineEye ,AiOutlineEyeInvisible} from 'react-icons/ai'
type InputType = {
  label : string
  message ? : string
  error : boolean

}& Omit<React.ComponentProps<'input'>, 'className'>

export const InputText = ({label, message,error, ...props} : InputType) => {
    return (
      <div className='flex flex-col gap-1 w-full'>
        <label htmlFor={props.id} className='text-md'>{label}</label>
        <input 
          {...props}
          className={`w-full border ${error ? 'border-red-500 ' : 'border-slate-400'}  rounded px-5 py-2 outline-none text-black`}/>
        {
          message && <span className='font-normal text-xs text-slate-500'>{message}</span>
  
        }
      </div>
    )
  }
  
export const InputPassword = ({label, message,error, ...props} : InputType) => {
    const [ showPassword, setShowPassword] = useState(false)
    return (
      <div className='relative flex flex-col gap-1 w-full'>
        <label htmlFor={props.id} className='text-md'>{label}</label>
        <input 
          type={showPassword ? 'text' : 'password'} 
          {...props} 
          className={`w-full border ${error ? 'border-red-500 ' : 'border-slate-400'} rounded px-5 py-2 outline-none text-black`}/>
        {
          message && <span className='font-normal text-xs text-slate-500'>{message}</span>
  
        }
        <button type='button' className='absolute w-max right-2' style={{top : '60%', padding : 0}} onClick={() => setShowPassword(val => !val)}>
            {
            !showPassword ? <AiOutlineEye className='text-blue text-xl cursor-pointer' /> : 
            <AiOutlineEyeInvisible className='text-blue text-xl cursor-pointer'/>
            }
        </button>
      </div>
    )
  }