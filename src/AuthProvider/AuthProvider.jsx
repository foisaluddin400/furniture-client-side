import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import Auth from "../firebase/Firebase";


export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(Auth,email,password)
    }

    const SignInUser = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(Auth, email,password)
    }
    const logOut =()=>{
        setLoading(true)
        return signOut(Auth)
    }
    const googleCreateUser=()=>{
        setLoading(true)
        return signInWithPopup(Auth, googleProvider)
    }


    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(Auth, currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })
        return()=> {
            unSubscribe()
        }
    })

    const AuthInfo = {user,createUser,SignInUser,logOut,googleCreateUser}
    return (

        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>

    );
};

export default AuthProvider;