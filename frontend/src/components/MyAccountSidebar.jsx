
import { useNavigate } from "react-router-dom";


function MyAccountSidebar({

    section,

    setSection

}){

    const navigate = useNavigate();

    return(

        <aside className="admin-sidebar">

            <button

                className={section==="dashboard" ? "active" : ""}

                onClick={()=>setSection("dashboard")}

            >

                🏠 Inicio

            </button>


            <button

                className={section==="orders" ? "active" : ""}

                onClick={()=>setSection("orders")}

            >

                🛒 Mis Compras

            </button>

            <button

                className={section==="sales" ? "active" : ""}

                onClick={()=>setSection("sales")}

            >

                🏪 Mis Ventas

            </button>

            <button

                className={section==="products" ? "active" : ""}

                onClick={()=>setSection("products")}

            >

                📦 Mis Productos

            </button>

            <button

                className={section==="publish" ? "active" : ""}

                onClick={()=>setSection("publish")}

            >

                ➕ Publicar Producto

            </button>

            <button

                className={section==="favorites" ? "active" : ""}

                onClick={()=>setSection("favorites")}

            >

                ❤️ Favoritos

            </button>

            <button

                className={section==="stats" ? "active" : ""}

                onClick={()=>setSection("stats")}

            >

                📈 Estadísticas

            </button>

            <button

              className={section==="monetization" ? "active" : ""}

              onClick={()=>setSection("monetization")}

            >

              🚀 Monetización

            </button>

            <button

                className={section==="settings" ? "active" : ""}

                onClick={()=>setSection("settings")}

            >

                ⚙ Configuración

            </button>

        </aside>

    );

}

export default MyAccountSidebar;