import {Link} from 'react-router-dom'
import { auth } from '../config/firebase'
import { useAuthState} from 'react-firebase-hooks/auth'
import {signOut} from 'firebase/auth'
export  const Navbar=()=>{
    const [user]=useAuthState(auth)
  const logout=async()=>{

await signOut(auth);
    }
    return<div className='nav'>
        <Link id='nav-home' to='/'>Home page</Link>
       {!user ?( <Link id='nav-login' to='/login'>login page</Link>)
                              :(  <Link id='nav-create' to='/createpost'>Create post</Link>)}
        <div className='nav-user'>{user && (
            <>
            <p id='nav-username'>{user?.displayName}</p>
            <img id='nav-userimg' src={user?.photoURL || ''} alt="profilepic" width="100" height="100"/>
            <button className='nav-logbutton' onClick={logout}>LogOut</button>
            </>
    )}    </div>
        
    </div>
}