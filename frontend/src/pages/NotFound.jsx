import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>404</h1>

      <h2>Página no encontrada</h2>

      <p>
        El contenido que buscás no existe o fue eliminado.
      </p>

      <Link
        to="/"
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          borderRadius: "8px",
          textDecoration: "none",
        }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;