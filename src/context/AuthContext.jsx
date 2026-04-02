import React, { createContext, useState, useEffect } from 'react';
import { auth } from "firebase/app"; // adjust the import based on your firebase config
import "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const register = async (email, password) => {
        return await auth().createUserWithEmailAndPassword(email, password);
    };

    const login = async (email, password) => {
        return await auth().signInWithEmailAndPassword(email, password);
    };

    const googleLogin = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return await auth().signInWithPopup(provider);
    };

    const logout = async () => {
        return await auth().signOut();
    };

    const updateUsername = async (username) => {
        return await currentUser.updateProfile({ displayName: username });
    };

    const resetPassword = async (email) => {
        return await auth().sendPasswordResetEmail(email);
    };

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, register, login, googleLogin, logout, updateUsername, resetPassword }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};