import { createUserWithEmailAndPassword,  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import Auth from "../firebase/Firebase";
import UseAxiosPublic from "../UseHook/UseAxiosPublic";


export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic= UseAxiosPublic()

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
    


    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(Auth, currentUser=>{
            setUser(currentUser)
            
             // step-1 jwt api create
             if(currentUser){
                //get token and store 
                const userInfo= {email : currentUser.email};

                axiosPublic.post('/jwt',userInfo)
                .then(res=> {
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token);
                        setLoading(false)
                    }
                })
            }
            else{
                localStorage.removeItem('access-token')
                setLoading(false)
            }
        })
        return()=> {
            unSubscribe()
        }
    },[axiosPublic])

    const AuthInfo = {user,loading,createUser,SignInUser,logOut}
    return (

        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>

    );
};

export default AuthProvider;