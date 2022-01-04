import './App.css';
import React, {useState, useRef} from 'react';
import {singup} from './firebase';


function App() {
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignup() {
    setLoading(true);
    try {
      await singup(emailRef.current.value, passwordRef.current.value);
    } catch {
      console.log("error");
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">

      <div className="Principal">
        <input ref={emailRef} placeholder="Email"></input>
        <input ref={passwordRef} type="password" placeholder="Password"></input>
      </div>

      <button disabled={loading} onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default App;
