import { useState } from "react";

import {
  createUserWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

    if (!passwordRegex.test(password)) {

    alert(
      "La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un símbolo."
    );

    return;
    }

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Usuario creado correctamente");

    } catch (error) {

      console.log(error);
      alert("Error al registrarse");

    }
  };

  return (
    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleRegister}
      >

        <h2>Crear cuenta</h2>

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
          Registrarse
        </button>
        <br />
        <small>
  La contraseña debe tener:
  8 caracteres, una mayúscula,
  un número y un símbolo.
</small>

      </form>

    </div>
  );
}

export default Register;