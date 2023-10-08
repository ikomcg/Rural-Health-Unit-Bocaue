import { ReactNode } from "react"
import style from './PageError.module.scss'

type ErrorPageType = {
    code : number
    message : string
    children? : ReactNode
}

const ErrorPage = ({
  code,
  message,
  children,
} : ErrorPageType) => {

  return (
  <div className={`${style.container}`}>
    <div className={style.content}>
        <div className="flex text-2xl">
            <div>{code}</div>
            <div className="mx-2 border border-black"></div>
            <div>{message}</div>
        </div>
        {children && <hr className="mt-2"/>}
        {children}
    </div>
  </div>
  )
}

export default ErrorPage