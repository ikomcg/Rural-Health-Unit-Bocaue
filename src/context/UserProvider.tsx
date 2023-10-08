import { createContext } from "react";
import { useCookies } from "react-cookie";

type ProviderType = {
    children : React.ReactNode
}
type ContextType = {
    cookies? : UserType | null
    saveCookies : (user : UserType ) => void
    deleteCookies : () => void
}
export const UserProvider = createContext<ContextType>({
    saveCookies : ()=>{},
    deleteCookies : ()=> {}
})

const Provider = ({children} : ProviderType) => {
    const [cookies, setCookies, removeCookies] = useCookies(['session'])
    
    const saveCookies = (user : UserType) => {

        setCookies("session", JSON.stringify(user) , {path : '/'})

    }
    const deleteCookies = () => {

        removeCookies("session")
        
    }

  return (
    <UserProvider.Provider value={{
        cookies : cookies.session,
        saveCookies,
        deleteCookies
    }}>
        {
            children
        }
    </UserProvider.Provider>
  )
}

export default Provider