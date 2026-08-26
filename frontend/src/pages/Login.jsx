import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";

import { auth } from "../firebase";
import "../styles/auth.css";

function Login() {
  
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);


const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user = userCredential.user;

    await user.reload();

    if (!user.emailVerified) {

      alert(
        "Debes verificar tu correo electrónico antes de ingresar."
      );

      await auth.signOut();

      return;
    }

    navigate("/");

  } catch (error) {

    console.log(error);

    alert(
      "Correo o contraseña incorrectos."
    );
  }
};


const handleForgotPassword = async () => {

  if (!email) {

    alert(
      "Ingresá tu correo electrónico para recuperar la contraseña."
    );

    return;
  }

  try {

    await sendPasswordResetEmail(
      auth,
      email
    );

    alert(
      "Te enviamos un correo para restablecer tu contraseña. Revisá también la carpeta de spam."
    );

  }

  catch (error) {

    console.error(
      "Error recuperando contraseña:",
      error
    );

    alert(
      "No se pudo enviar el correo de recuperación."
    );

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
        <div className="password-field">

  <input
    type={mostrarPassword ? "text" : "password"}
    placeholder="Contraseña"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <button
    type="button"
    className="password-toggle"
    onClick={() =>
      setMostrarPassword(!mostrarPassword)
    }
    aria-label={
      mostrarPassword
        ? "Ocultar contraseña"
        : "Mostrar contraseña"
    }
  >
    {mostrarPassword ? "🙈" : "👁️"}
  </button>

</div>
        <button type="submit">
          Ingresar
        </button>

<button
  type="button"
  className="forgot-password-button"
  onClick={handleForgotPassword}
>
  ¿Olvidaste tu contraseña?
</button>
      </form>
    </div>
  );
}

export default Login;