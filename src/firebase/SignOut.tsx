import { signOut } from "firebase/auth"
import { auth } from "./Base"

 
export const SignOutFireBase = async () => {
    
    return await signOut(auth).then(()=> {
       return true
    }).catch(() => {
        return null
    })

}