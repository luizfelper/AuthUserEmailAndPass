import './App.css';
import React, { useState, useRef } from 'react';
import { singup, logout, useAuth } from './firebase';


function App() {
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignup() {
    setLoading(true);
    try {
      await singup(emailRef.current.value, passwordRef.current.value);
    } catch {
      console.log("error");
    }
      setLoading(false);
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      console.log("error");
    }
      setLoading(false);
  }

    return (
      <div className="App">

        <div>
          Atualmente logado como: {currentUser?.email}
        </div>

        <div className="Principal">
          <input ref={emailRef} placeholder="Email"></input>
          <input ref={passwordRef} type="password" placeholder="Password"></input>
        </div>

        <button disabled={loading || currentUser != null} onClick={handleSignup}>Sign Up</button>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    );
  }

  export default App;
