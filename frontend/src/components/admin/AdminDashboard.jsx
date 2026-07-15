import { useEffect, useState } from "react";

import { auth } from "../../firebase";

import { getDashboardStatsService } from "../../services/adminService";

function AdminDashboard() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        loadStats();

    }, []);

    const loadStats = async () => {

        try {

            const token =

                await auth.currentUser.getIdToken();

            const data =

                await getDashboardStatsService(token);

            setStats(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    if (!stats) {

        return <h2>Cargando Dashboard...</h2>;

    }

    return (

        <div className="dashboard">

            <h1>🛠 Dashboard General SYPSY</h1>

            <div className="stats-grid">

                <div className="stat-card">
                    <h3>👥 Usuarios</h3>
                    <p>{stats.totalUsers}</p>
                </div>

                <div className="stat-card">
                    <h3>🏪 Vendedores</h3>
                    <p>{stats.totalSellers}</p>
                </div>

                <div className="stat-card">
                    <h3>⭐ Verificados</h3>
                    <p>{stats.verifiedSellers}</p>
                </div>

                <div className="stat-card">
                    <h3>👑 Administradores</h3>
                    <p>{stats.totalAdmins}</p>
                </div>

                <div className="stat-card">
                    <h3>📦 Productos</h3>
                    <p>{stats.totalProducts}</p>
                </div>

                <div className="stat-card">
                    <h3>📢 Publicidades</h3>
                    <p>{stats.activeAds}</p>
                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;