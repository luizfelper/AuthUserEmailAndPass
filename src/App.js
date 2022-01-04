import './App.css';
import React, { useState, useRef } from 'react';
import { singup, login, logout, useAuth } from './firebase';


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
      console.log("error: ");
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

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      console.log("error: ");
    }
      setLoading(false);
  }

    return (
      <div className="App">
        <div>
          Atualmente logado como: {currentUser?.email}
        </div>

        <div className="Principal">
          <div className="Form">
            <input ref={emailRef} placeholder="Email"></input>
            <input ref={passwordRef} type="password" placeholder="Password"></input>
          </div>
        </div>

      <div className="butoes">
          <button disabled={loading || currentUser != null} onClick={handleSignup}>Sign Up</button>
          <button disabled={loading || currentUser != null} onClick={handleLogin}>LogIn</button>
          <button  disabled={loading || !currentUser } onClick={handleLogout}>Log Out</button>
      </div>
      </div>
    );
  }

  export default App;
