import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.init';



export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider();

    // Signup user
    const SignUpUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // state observer and get user data
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unSubscribe()
        }
    }, [])

    // Login
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Sign In with Google

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    // update profile

    const updateUser = (updateData) => {
        return updateProfile(auth.currentUser, updateData)
    }


    // handleLogOut

    const logOut = () => {
        return signOut(auth);
    }

    const userData = {
        user,
        setUser,
        SignUpUser,
        login,
        googleLogin,
        updateUser,
        logOut,
        loading, 
        setLoading,
    }


    return <AuthContext value={userData}>
        {children}
    </AuthContext>;
};

export default AuthProvider;