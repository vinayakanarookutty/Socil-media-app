import { auth,provider} from '../config/firebase'
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
export  const Login=()=>{
    const Navigate=useNavigate()
    const googlesignin=async ()=>{
        const result= await signInWithPopup(auth,provider)
        console.log(result)
        Navigate('/')
    }
    return<div>
        <p>Sign in with google</p>
        <button onClick={googlesignin}>Sign in with google</button>
    </div>
}