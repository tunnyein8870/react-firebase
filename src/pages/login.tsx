import { useNavigate } from 'react-router-dom';
import {auth, gProvider, fProvider} from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
export const Login = ()=>{
    const navigate = useNavigate();
    const gSignIn = async()=>{
        await signInWithPopup(auth, gProvider);
        navigate("/");
    }
    const fSignIn = async()=>{
        await signInWithPopup(auth, fProvider);
        navigate("/");
    }

    return (
        <div>
            <button onClick={gSignIn}>Google Login</button>
            <button onClick={fSignIn}>Facebook Login</button>
        </div>
    )
}