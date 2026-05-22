import { useState } from "react";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Sesión iniciada");

    } catch (error) {

      console.log(error);
      alert("Error al iniciar sesión");

    }
  };

  return (
    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleLogin}
      >

        <h2>Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Ingresar
        </button>

      </form>

    </div>
  );
}

export default Login;