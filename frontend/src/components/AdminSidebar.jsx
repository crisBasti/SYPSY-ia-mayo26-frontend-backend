

function AdminSidebar({ section, setSection }) {
  return (
    <aside className="admin-sidebar">

      <button

    className={section === "dashboard" ? "activo" : ""}

    onClick={() => setSection("dashboard")}

>

    📊 Dashboard

</button>

      <button

    className={section === "users" ? "activo" : ""}

    onClick={() => setSection("users")}

>

    👥 Usuarios

</button>

      <button

    className={section === "products" ? "activo" : ""}

    onClick={() => setSection("products")}

>

    📦 Productos

</button>

      <button

    className={section === "orders" ? "activo" : ""}

    onClick={() => setSection("orders")}

>

    📦 Pedidos

</button>


<button

    className={section === "payments" ? "activo" : ""}

    onClick={() => setSection("payments")}

>

    💳 Pagos

</button>

<button

    className={
        section==="promotionPayments"
        ? "active"
        : ""
    }

    onClick={()=>
        setSection("promotionPayments")
    }

>

    🚀 Pagos Promociones

</button>


      <button

    className={section === "ads" ? "activo" : ""}

    onClick={() => setSection("ads")}

>

    📢 Publicidad

</button>

<button

    className={section === "finance" ? "activo" : ""}

    onClick={() => setSection("finance")}

>

    💰 Finanzas

</button>

      <button

    className={section === "reports" ? "activo" : ""}

    onClick={() => setSection("reports")}

>

    📈 Reportes

</button>

      <button

    className={section === "settings" ? "activo" : ""}

    onClick={() => setSection("settings")}

>

    ⚙ Configuración

</button>

    </aside>
  );
}

export default AdminSidebar;