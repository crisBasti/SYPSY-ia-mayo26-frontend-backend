function MyAccountSidebar({

    section,

    setSection

}){

    return(

        <aside className="admin-sidebar">

            <button

                onClick={()=>setSection("dashboard")}

            >

                🏠 Inicio

            </button>

            <button

                onClick={()=>setSection("publish")}

            >

                ➕ Publicar

            </button>

            <button

                onClick={()=>setSection("products")}

            >

                📦 Mis publicaciones

            </button>

            <button

                onClick={()=>setSection("stats")}

            >

                📈 Estadísticas

            </button>

            <button

                onClick={()=>setSection("favorites")}

            >

                ❤️ Favoritos

            </button>

            <button

                onClick={()=>setSection("settings")}

            >

                ⚙ Configuración

            </button>

        </aside>

    );

}

export default MyAccountSidebar;