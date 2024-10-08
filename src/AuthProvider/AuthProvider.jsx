import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useState } from "react";
import Auth from "../firebase/Firebase";


export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const createUser = (email,password) =>{
        return createUserWithEmailAndPassword(Auth,email,password)
    }

    const SignInUser = (email,password)=>{
        return signInWithEmailAndPassword(Auth, email,password)
    }

    const AuthInfo = {user,createUser,SignInUser}
    return (

        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>

    );
};

export default AuthProvider;