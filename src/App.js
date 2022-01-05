import {Button} from 'antd';
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
      alert('Falha no cadastro, tente novamente.');
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
      alert("Usuário ou senha inválidos");
      console.log("error: ");
    }
    setLoading(false);
  }

   
  return (
    <div className="App">

      {currentUser === null &&
        <div>
          <h1>Faça Login ou Cadastre-se!</h1>
        </div>
      }

      {currentUser !== null &&
        <div>
          <h1>Logado como: {currentUser?.email}</h1>
        </div>
      }


      <div className="Principal">
        <div className="Form">
          <input ref={emailRef} placeholder="Email"></input>
          <input ref={passwordRef} type="password" placeholder="Password"></input>
        </div>
      </div>

      <div className="butoes">
        <Button type="primary" disabled={loading || currentUser != null} onClick={handleSignup}>Cadastrar</Button>
        <Button type="primary"disabled={loading || currentUser != null} onClick={handleLogin}>Logar</Button>
        <Button disabled={loading || !currentUser} onClick={handleLogout}>Sair</Button>
      </div>
    </div>
  );
}

export default App;
