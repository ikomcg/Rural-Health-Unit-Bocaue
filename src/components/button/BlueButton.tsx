import React from 'react'
import btn_style from './Button.module.scss'

type BlueButtonType = {

} & React.ComponentProps<'button'>

export const BlueButton = (props : BlueButtonType) => {
    const {
        disabled, 
        children, 
        className , 
        ...cleanProps} = props
    return (
        <button 
            {...cleanProps} 
            disabled={disabled}
            className={` ${!disabled ? `${btn_style.blue_btn} ${btn_style.action_btn}` : 'bg-[gray]'} ${btn_style.btn} border px-3 ${className}`}>
            {children}
        </button>
    )
}
