import { useEffect, useState } from "react";
import { auth } from "../firebase";

import { getMyStats } from "../services/productService";

import StatCard from "../components/dashboard/StatCard";
import ProductsTable from "../components/dashboard/ProductsTable";

function Dashboard() {

    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadStats = async () => {

            try {

                const token =
                    await auth.currentUser.getIdToken();

                const data =
                    await getMyStats(token);

                setStats(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        loadStats();

    }, []);

    if (loading) {

        return <h2>Cargando estadísticas...</h2>;

    }

    if (!stats) {

        return <h2>No se pudieron cargar las estadísticas.</h2>;

    }

    return (

        <div className="dashboard">

            <h1>

                📊 Panel del vendedor

            </h1>

            <div className="stats-grid">

                <StatCard
                    title="Productos"
                    value={stats.totalProducts}
                    icon="📦"
                />

                <StatCard
                    title="Visualizaciones"
                    value={stats.totalViews}
                    icon="👁"
                />

                <StatCard
                    title="WhatsApp"
                    value={stats.totalWhatsappClicks}
                    icon="📲"
                />

                <StatCard
                    title="Conversión"
                    value={`${stats.conversionRate}%`}
                    icon="📈"
                />

            </div>

            <h2>

                Mis productos

            </h2>

            <ProductsTable
                products={stats.products}
            />

        </div>

    );

}

export default Dashboard;