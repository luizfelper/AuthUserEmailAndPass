import {useState, useEffect} from 'react';
import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function singup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
    signOut(auth);
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
