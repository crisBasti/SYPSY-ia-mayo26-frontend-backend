import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification
} from "firebase/auth";
import "../styles/auth.css";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);

const [nombre, setNombre] = useState("");
const [apellido, setApellido] = useState("");
const [telefono, setTelefono] = useState("");

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

      const userCredential =
  await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

const user =
  userCredential.user;

await updateProfile(user, {
  displayName: `${nombre} ${apellido}`,
});

await sendEmailVerification(user);

await auth.signOut();

  await fetch(
  "https://sypsy-ia-mayo26-frontend-backend.onrender.com/api/users",
  {
    method: "POST",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify({
      uid: user.uid,
      nombre,
      apellido,
      email,
      telefono,
    }),
  }
);

      alert(
            "Cuenta creada correctamente. Revisá tu correo y verificá tu email antes de iniciar sesión."
      );
      

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
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
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