import { useEffect, useState } from "react";
import { createContext } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import {app} from '../Firebase/firebase.config'
//const axios = require('axios');
import axios from 'axios'


export const AuthContext = createContext(null)
const auth = getAuth(app)
const AuthProvider =({children})=>{
    const [user, setuser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    
    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email,password)

    }

    const signIn =(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleSignIn =()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logOut =()=>{
        setLoading(true);
        return signOut(auth);
    }

    const updateProf =(name,photo)=>{
        return updateProfile(auth.currentUser,{
            displayName: name, photoURL: photo
        });
    }

    useEffect(()=>{
     const unsubscribe= onAuthStateChanged(auth, currentUser =>{
        setuser(currentUser);
        console.log(currentUser)
     if(currentUser){
        axios.post('https://bistro-server-five.vercel.app/jwt',{email: currentUser.email})
        .then(data =>{
            console.log(data.data.token)
            localStorage.setItem('access-token', data.data.token)
            setLoading(false)
        })
     }
     else{
        localStorage.removeItem('access-token')
     }

        
     })
     return ()=>{
        return unsubscribe();
     }
    }, [])

    const authInfo={
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateProf, googleSignIn
    }
    return(
<AuthContext.Provider value={authInfo}>
    {children}
</AuthContext.Provider>
    );
};

export default AuthProvider;