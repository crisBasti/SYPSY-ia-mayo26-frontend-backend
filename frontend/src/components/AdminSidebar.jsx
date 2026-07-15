function AdminSidebar({ section, setSection }) {
  return (
    <aside className="admin-sidebar">

      <button onClick={() => setSection("dashboard")}>
        📊 Dashboard
      </button>

      <button onClick={() => setSection("users")}>
        👥 Usuarios
      </button>

      <button onClick={() => setSection("products")}>
        📦 Productos
      </button>

      <button onClick={() => setSection("orders")}>
        📦 Pedidos
      </button>

      <button onClick={() => setSection("ads")}>
        📢 Publicidad
      </button>

      <button onClick={() => setSection("reports")}>
        📈 Reportes
      </button>

      <button onClick={() => setSection("settings")}>
        ⚙ Configuración
      </button>

    </aside>
  );
}

export default AdminSidebar;