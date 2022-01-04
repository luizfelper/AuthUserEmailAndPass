import {useState, useEffect} from 'react';
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6XPX9hghuJvnvS_GtdzOPFM0XQGN8680",
  authDomain: "auth-aa223.firebaseapp.com",
  projectId: "auth-aa223",
  storageBucket: "auth-aa223.appspot.com",
  messagingSenderId: "971381598037",
  appId: "1:971381598037:web:78cb1a649b21fb58ae31dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function singup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

//Hook customizado para pegar o usuario logado
export function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {setCurrentUser(user)});
        return unsub;
    }, [])

    return currentUser;
}

export function logout() {
    signOut(auth);
}