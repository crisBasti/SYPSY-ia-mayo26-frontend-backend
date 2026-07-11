function AdminSidebar({

    section,

    setSection

}) {

    return (

        <aside className="admin-sidebar">

            <h2>SYPSY Admin</h2>

            <button onClick={() => setSection("dashboard")}>

                📊 Dashboard

            </button>

            <button onClick={() => setSection("reports")}>

                🚩 Reportes

            </button>

            <button onClick={() => setSection("products")}>

                📦 Publicaciones

            </button>

            <button onClick={() => setSection("users")}>

                👤 Usuarios

            </button>

            <button onClick={() => setSection("analytics")}>

                📈 Analytics

            </button>

            <button

className={

section==="advertisements"

? "active"

: ""

}

onClick={()=>

setSection(

"advertisements"

)

}

>

📢 Publicidad

</button>

            <button onClick={() => setSection("settings")}>

                ⚙ Configuración

            </button>

        </aside>

    );

}

export default AdminSidebar;