import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
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
      </form>
    </div>
  );
}

export default Login;