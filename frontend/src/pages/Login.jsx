import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    alert("Sesión iniciada");

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