import { useNavigate } from "react-router-dom";

function DashboardQuickActions() {

    const navigate = useNavigate();

    const actions = [

        {
    icon:"➕",
    title:"Publicar producto",
    description:"Creá una nueva publicación.",
    path:"/micuenta?section=publish"
},
{
    icon:"📦",
    title:"Mis productos",
    description:"Administrá tu catálogo.",
    path:"/micuenta?section=products"
},
{
    icon:"🛒",
    title:"Mis ventas",
    description:"Gestioná tus pedidos.",
    path:"/micuenta?section=sales"
},
{
    icon:"🚀",
    title:"Impulsar ventas",
    description:"Promocioná tus productos.",
    path:"/micuenta?section=monetization"
}

    ];

    return (

        <div className="dashboard-actions">

            <h2>⚡ Acciones rápidas</h2>

            <div className="dashboard-actions-grid">

                {

                    actions.map((action) => (

                        <div

                            key={action.title}

                            className="dashboard-action-card"

                            onClick={() => navigate(action.path)}

                        >

                            <div className="dashboard-action-icon">

                                {action.icon}

                            </div>

                            <h3>

                                {action.title}

                            </h3>

                            <p>

                                {action.description}

                            </p>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default DashboardQuickActions;