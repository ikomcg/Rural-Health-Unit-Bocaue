import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./Base"


export const SignInWithEmailAndPassword = async (email : string, password : string) => {

   return await signInWithEmailAndPassword(auth, email, password )
    .then(res => {
      // signed in
      return{
        status : true,
        res,
      }
      // ...
    }).catch((err) => {
        return {
          status : null,
          res : err
        }
    })
 
}